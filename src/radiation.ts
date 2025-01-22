import {Parameters} from "./parameters";
import {ResponseCallback, Source} from "./source";
import {Road} from "./road";
import {IDrawable} from "./core/interfaces";
import { Graphics } from "./core/graphics";
import {Heatmap} from "./ui/heatmap";
import {Vector2} from "./core/vector2";

export class Radiation implements IDrawable {
    private _first: Source;
    private _second: Source;
    private _heatmap: Heatmap;

    constructor(parameters: Parameters, accelerator: Road) {
        this._first = new Source(parameters.FirstSource, parameters.FirstSourceIntensity, accelerator);
        this._second = new Source(parameters.SecondSource, parameters.SecondSourceIntensity, accelerator);
        this._heatmap = new Heatmap(new Vector2(-500, -100), new Vector2(500, 100), new Vector2(100, 20));

    }

    public RadiationAt(point: Vector2, response: ResponseCallback | null = null, other: Vector2 | null = null): number {
        return this._first.Radiation(point, response, other) + this._second.Radiation(point, response, other);
    }

    Draw(graphics: Graphics): void {
        this._first.Draw(graphics);
        this._second.Draw(graphics);

        this._heatmap.Update((p) => {
            return this.RadiationAt(p);
        });
        this._heatmap.Draw(graphics);
    }
}