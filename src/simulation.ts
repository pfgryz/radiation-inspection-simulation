import {Graphics} from "./core/graphics";
import {Parameters} from "./parameters";
import {Rover} from "./rover";
import {Tunnel} from "./tunnel";
import {Vector2} from "./core/vector2";
import {TicksCounter} from "./ticksCounter";

const TimeoutMinimalDuration: number = 4;

export class Simulation {
    private readonly _graphics: Graphics;
    private _parameters: Parameters;

    private _rover: Rover;
    private _tunnel: Tunnel;

    private _alive: boolean;
    private _interval: number | null;
    private _lastTick: number;
    private _nextTicks: number;
    private _lastFrame: number;
    private _ticksCounter: TicksCounter;

    constructor(graphics: Graphics, parameters: Parameters) {
        this._graphics = graphics;
        this._parameters = parameters;

        this._tunnel = new Tunnel();
        this._rover = new Rover(this._tunnel.Road.Begin, this._tunnel.Road, parameters.Velocity, parameters.Angle);

        this._interval = null;
        this._alive = false;
        this._lastTick = Date.now();
        this._nextTicks = 0;
        this._lastFrame = 0;

        this._ticksCounter = new TicksCounter();

        this._graphics.Resize();
        this._graphics.Scale(1000, 200);
        this._graphics.Center()
        this._graphics.DrawText("Press [START]", new Vector2(0, 0));
    }

    public Start(): void {
        this._alive = true;
        this._lastTick = performance.now();
        this.Loop();
        this._ticksCounter.Start();
    }

    public Stop(): void {
        this._alive = false;
        this._ticksCounter.Stop();
    }

    public Step(): void {
        this.Update();
    }

    public Reset(): void {
        this.Stop();

        this._rover.Reset();
        this.Draw(true);
    }

    public Loop(): void {
        const time = performance.now();
        const tickDuration = time - this._lastTick;

        this._nextTicks += (this._parameters.TPS.value * this._parameters.Speed.value * tickDuration) / 1000;

        while (this._nextTicks > 0) {
            this.Update();
            this._ticksCounter.Ticks++;
            this._nextTicks--;
        }

        this._lastTick = time;

        if (this._alive) {
            setTimeout(
                () => {
                    this.Loop()
                },
                TimeoutMinimalDuration
            );
        }
    }

    public Update(): void {
        this._rover.Update(1 / this._parameters.TPS.value);
        this.Draw();
    }

    public Draw(force?: boolean): void {
        const time = Date.now();
        const frameDuration = 1000 / this._parameters.FPS.value;

        if (time - this._lastFrame > frameDuration || force) {
            this._lastFrame = time;
            this._graphics.Clear();
            this._tunnel.Draw(this._graphics);
            this._rover.Draw(this._graphics);
            this._graphics.DrawText("TPS: " + this._ticksCounter.TPS, new Vector2(450, -200));
        }
    }
}