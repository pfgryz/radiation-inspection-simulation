import { Graphics } from "./core/graphics";
import {IDrawable} from "./core/interfaces";
import {Vector2} from "./core/vector2";
import {radians} from "./core/helpers";
import {ARROW} from "./rover";

export class Arrow implements IDrawable {
    private _position: Vector2;
    private _angle: number;
    private _cpm: number;

    constructor(position: Vector2, angle: number, cpm: number) {
        this._position = position;
        this._angle = angle;
        this._cpm = cpm;
    }

    Draw(graphics: Graphics): void {
        graphics.DrawShape(
            this._position,
            ARROW.Rotate(radians(this._angle))
        );
        graphics.Stroke();
    }
}