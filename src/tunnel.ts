import { Graphics } from "./core/graphics";
import {IDrawable, IUpdate} from "./core/interfaces";
import {Shape} from "./core/shape";
import {Vector2} from "./core/vector2";
import {Color} from "./core/color";

export class Tunnel implements IDrawable {
    private _barrier: Shape = new Shape([
        new Vector2(-500, 60),
        new Vector2(500, 60),
        new Vector2(500, -60),
        new Vector2(-500, -60)
    ]);

    private _accelerator: [Vector2, Vector2] = [
        new Vector2(-475, 30),
        new Vector2(475, 30)
    ]

    private _road: [Vector2, Vector2] = [
        new Vector2(-450, -10),
        new Vector2(350, -10)
    ]

    get Road(): [Vector2, Vector2] {
        return this._road;
    }

    public Draw(graphics: Graphics): void {
        graphics.DrawShape(Vector2.Zero, this._barrier);
        graphics.Stroke(Color.Grey, 4);

        graphics.DrawLine(this._accelerator[0], this._accelerator[1]);
        graphics.Stroke(Color.Red, 4);

        graphics.DrawLine(this._road[0], this._road[1]);
        graphics.Stroke(Color.Blue, 1, [5, 10]);
    }
}