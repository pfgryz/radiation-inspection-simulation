import {Graphics} from "./core/graphics";
import {Parameters} from "./parameters";
import {Rover} from "./rover";
import {Tunnel} from "./tunnel";
import {Vector2} from "./core/vector2";

export class Simulation {
    private readonly _graphics: Graphics;
    private _parameters: Parameters;
    private readonly _resolution: number;

    private _rover: Rover;
    private _tunnel: Tunnel;

    private _alive: boolean;
    private _interval: number | null;
    private _lastDraw: number;
    private _ticks: number;

    constructor(graphics: Graphics, parameters: Parameters, resolution: number) {
        this._graphics = graphics;
        this._parameters = parameters;
        this._resolution = resolution;

        this._tunnel = new Tunnel();
        this._rover = new Rover(this._tunnel.Road[0], parameters.Velocity, parameters.Angle);

        this._interval = null;
        this._alive = false;
        this._lastDraw = 0;
        this._ticks = 0;

        this._graphics.Resize();
        this._graphics.Scale(1000, 200);
        this._graphics.Center()
    }

    public Start(): void {
        this._alive = true;
        this.Update();
    }

    public Stop(): void {
        this._alive = false;
    }

    public Update(): void {
        setTimeout(() => {
            if (this._alive) {
                this.Update();
                this.Draw();
            }
        }, 1000 / this._resolution / this._parameters.Speed.value);

        this._ticks++;
        this._rover.Update(1 / this._resolution);
    }

    public Draw(): void {
        const time = Date.now();
        const frameDuration = 1000 / this._parameters.FPS.value;

        if (time - this._lastDraw > frameDuration) {
            this._lastDraw = time;
            this._graphics.Clear();
            this._tunnel.Draw(this._graphics);
            this._rover.Draw(this._graphics);

            this._graphics.DrawText((this._ticks / frameDuration * 1000).toString(), new Vector2(0, 0));
            this._ticks = 0;
        }
    }
}