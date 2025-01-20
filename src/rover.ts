import {IDrawable, IPosition, IUpdate} from "./core/interfaces";
import {Ref} from "./core/ref";
import {Vector2} from "./core/vector2";
import {Shape} from "./core/shape";
import {Graphics} from "./core/graphics";

const radians = (degrees: number): number => degrees * Math.PI / 180;

export class Rover implements IUpdate, IDrawable, IPosition {
    private _position: Ref<Vector2>;
    private _velocity: Ref<number>;
    private _angle: Ref<number>;

    private _shape: Shape = new Shape([
        new Vector2(-1, 0.5),
        new Vector2(0.5, 0.5),
        new Vector2(1, 0),
        new Vector2(0.5, -0.5),
        new Vector2(-1, -0.5),
    ]).Scale(10);
    private _arrow: Shape = new Shape([
        new Vector2(0, 0.1),
        new Vector2(1.7, 0.1),
        new Vector2(1.4, 0.3),
        new Vector2(1.7, 0.3),
        new Vector2(2.0, 0.0),
        new Vector2(1.7, -0.3),
        new Vector2(1.4, -0.3),
        new Vector2(1.7, -0.1),
        new Vector2(0, -0.1)
    ]).Scale(15);

    constructor(position: Vector2, velocity: Ref<number>, angle: Ref<number>) {
        this._position = new Ref(position);
        this._velocity = velocity;
        this._angle = angle;
    }

    public Position(): Vector2 {
        return this._position.value;
    }

    public Update(time_delta: number): void {
        this._position.value = this._position.value.Add(new Vector2(1, 0).Scale(this._velocity.value * 20).Scale(time_delta));
    }

    public Draw(graphics: Graphics): void {
        graphics.DrawShape(this._position.value, this._shape);
        graphics.Stroke();

        graphics.DrawShape(this._position.value, this._arrow.Rotate(radians(this._angle.value)));
        graphics.Fill();
    }
}