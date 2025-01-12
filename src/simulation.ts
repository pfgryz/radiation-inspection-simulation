import {Graphics} from "./core/graphics";
import {Parameters} from "./parameters";
import {Vector2} from "./core/vector2";
import {Rover} from "./rover";
import {Tunnel} from "./tunnel";

export class Simulation {
    private readonly _resolution: number;
    private _interval: number | null;

    private readonly _graphics: Graphics;
    private _parameters: Parameters;

    private _rover: Rover;
    private _tunnel: Tunnel;

    constructor(graphics: Graphics, parameters: Parameters, resolution: number) {
        this._resolution = resolution;
        this._interval = null;

        this._graphics = graphics;
        this._parameters = parameters;

        this._tunnel = new Tunnel();
        this._rover = new Rover(this._tunnel.Road[0], parameters.Velocity);

        this._graphics.Resize();
        this._graphics.Scale(1000, 200);
        this._graphics.Center()
    }

    public Start(): void {
        if (this._interval == null) {
            this._interval = setInterval(() => {
                this.Update();
                this.Draw();
            }, this._resolution);
        }
    }

    public Stop(): void {
        if (this._interval != null) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    public Update(): void {
        this._rover.Update(this._resolution);
    }

    public Draw(): void {
        this._graphics.Clear();
        this._tunnel.Draw(this._graphics);
        this._rover.Draw(this._graphics);
    }
}