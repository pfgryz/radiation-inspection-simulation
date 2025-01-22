import {IDrawable} from "../core/interfaces";
import {Graphics} from "../core/graphics";
import {Vector2} from "../core/vector2";
import {Color} from "../core/color";

export function GetRadiationColor(doseRate: number): string {
    const alpha = 0.4;

    if (doseRate < 0.5) {
        return `rgba(255, 255, 255, 0)`;
    } else if (doseRate < 3.5) {
        return ColorInterpolation(
            [255, 255, 255],
            [0, 255, 0],
            (doseRate - 1.5) / 3.5,
            alpha
        );
    } else if (doseRate < 15) {
        return ColorInterpolation(
            [0, 255, 0],
            [255, 255, 0],
            (doseRate - 3.5) / (15 - 3.5),
            alpha
        );
    } else if (doseRate < 500) {
        return ColorInterpolation(
            [255, 255, 0],
            [255, 0, 0],
            (doseRate - 15) / (500 - 15),
            alpha
        );
    } else if (doseRate < 6000) {
        return ColorInterpolation(
            [255, 0, 0],
            [128, 0, 128],
            (doseRate - 500) / (6000 - 500),
            alpha
        );
    } else {
        return ColorInterpolation(
            [128, 0, 128],
            [0, 0, 0],
            (doseRate - 6000) / 150000,
            alpha
        );
    }
}

function ColorInterpolation(from: [number, number, number], to: [number, number, number], coefficient: number, alpha: number): string {
    const r = Math.round(from[0] + coefficient * (to[0] - from[0]));
    const g = Math.round(from[1] + coefficient * (to[1] - from[1]));
    const b = Math.round(from[2] + coefficient * (to[2] - from[2]));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
                const color = GetRadiationColor(value);
                graphics.Fill(color);
                graphics.Stroke(color);

                position.x += size.x;
            }

            position.y += size.y;
        }
    }

    Update(callback: (vector: Vector2) => number) {
        const size = this._to.Subtract(this._from).Div(this._resolution);

        let position = this._from.Clone();
        position = position.Add(size.Scale(0.5));

        for (let row = 0; row < this._resolution.y; row++) {
            position.x = this._from.x;

            for (let column = 0; column < this._resolution.x; column++) {
                this._data[row][column] = callback(position);
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