import {IDrawable} from "../core/interfaces";
import {Graphics} from "../core/graphics";
import {Vector2} from "../core/vector2";
import {Color} from "../core/color";

export class Heatmap implements IDrawable {
    private _from: Vector2;
    private _to: Vector2;
    private readonly _resolution: Vector2;
    private readonly _data: any[];

    constructor(from: Vector2, to: Vector2, resolution: Vector2) {
        this._from = from;
        this._to = to;
        this._resolution = resolution;

        this._data = [];
        for (let row = 0; row < resolution.y; row++) {
            this._data[row] = [];
            for (let column = 0; column < resolution.x; column++) {
                this._data[row][column] = 0;
            }
        }
    }

    Draw(graphics: Graphics): void {
        const size = this._to.Subtract(this._from).Div(this._resolution);

        let position = this._from.Clone();

        for (let row = 0; row < this._resolution.y; row++) {
            position.x = this._from.x;

            for (let column = 0; column < this._resolution.x; column++) {
                const value = this._data[row][column];

                graphics.DrawRectangle(
                    position,
                    size.x,
                    size.y
                );
                if (value == 0) {
                    graphics.Fill(Color.Blue);
                    graphics.Stroke(Color.Blue);
                } else {
                    graphics.Fill(Color.Red);
                    graphics.Stroke(Color.Red);
                }

                position.x += size.x;
            }

            position.y += size.y;
        }
    }

    Set(position: Vector2, value: number) {
        const size = this._to.Subtract(this._from).Div(this._resolution);
        let r = position.Subtract(this._from).Div(size).Int();
        this._data[r.y][r.x] = value;
    }
}