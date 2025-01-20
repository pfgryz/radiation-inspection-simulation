import {IDrawable, IPosition, IUpdate} from "./core/interfaces";
import {Ref} from "./core/ref";
import {Vector2} from "./core/vector2";
import {Shape} from "./core/shape";
import {Graphics} from "./core/graphics";
import {Road} from "./road";
import {radians} from "./core/helpers";

export class Rover implements IUpdate, IDrawable, IPosition {
    private _position: Ref<Vector2>;
    private _roadPosition: Ref<number>;
    private _road: Road;
    private _velocity: Ref<number>;
    private _angle: Ref<number>;
    private _direction: Ref<boolean>;

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

    constructor(position: Vector2, road: Road, velocity: Ref<number>, angle: Ref<number>) {
        this._position = new Ref(position);
        this._roadPosition = new Ref(0);
        this._direction = new Ref(false);
        this._road = road;
        this._velocity = velocity;
        this._angle = angle;
    }

    public Reset(): void {
        this._roadPosition.value = 0;
        this._direction.value = false;
        this._position.value = this._road.GetPosition(this._roadPosition.value);
    }

    public Direction(): number {
        return this._direction.value ? -1 : 1;
    }

    public Position(): Vector2 {
        return this._position.value;
    }

    public Update(time_delta: number): void {
        const diff = this.Direction() * this._velocity.value * 20 * time_delta;
        const [roadPosition, changeDirection] =  this._road.NextPosition(this._roadPosition.value, diff);
        this._roadPosition.value = roadPosition;
        if (changeDirection) {
            this._direction.value = !this._direction.value;
        }
        this._position.value = this._road.GetPosition(this._roadPosition.value);
    }

    public Draw(graphics: Graphics): void {
        graphics.DrawShape(this._position.value, this._shape);
        graphics.Stroke();

        graphics.DrawShape(this._position.value, this._arrow.Rotate(radians(this._angle.value)));
        graphics.Fill();
    }
}