import {IDrawable, IPosition, IUpdate} from "./core/interfaces";
import {Ref} from "./core/ref";
import {Vector2} from "./core/vector2";
import {Shape} from "./core/shape";
import {Graphics} from "./core/graphics";
import {Road} from "./road";
import {radians} from "./core/helpers";
import {Dosimeter} from "./dosimeter";
import {Arrow} from "./arrow";

export const SCALE: number = 20;

export const ARROW: Shape = new Shape([
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

export class Rover implements IUpdate, IDrawable, IPosition {
    private _mode: Ref<number>;
    private _second_mode_distance: Ref<number>;
    private _position: Ref<Vector2>;
    private _roadPosition: Ref<number>;
    private _road: Road;
    private _velocity: Ref<number>;
    private _angle: Ref<number>;
    private _direction: Ref<boolean>;
    private _state: number = 0;
    private _state_counter: number = 0;

    private _shape: Shape = new Shape([
        new Vector2(-1, 0.5),
        new Vector2(0.5, 0.5),
        new Vector2(1, 0),
        new Vector2(0.5, -0.5),
        new Vector2(-1, -0.5),
    ]).Scale(10);
    private _dosimeter: Dosimeter | null = null;
    private _last_cpm: number = 0;
    private _last_angle: number = 0;
    private _arrows: Arrow[] = [];

    constructor(mode: Ref<number>, secondModeDistance: Ref<number>, position: Vector2, road: Road, velocity: Ref<number>, angle: Ref<number>) {
        this._mode = mode;
        this._second_mode_distance = secondModeDistance;
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

    public View(): Vector2 {
        return new Vector2(1, 0).Rotate(Vector2.Zero, radians(this._angle.value));
    }

    public Position(): Vector2 {
        return this._position.value;
    }

    public Update(time_delta: number): void {
        if (this._mode.value == 0) {
            this.Advance(time_delta);
        } else {
            if (this._state == 0) {
                this._angle.value += 10;

                if (this._dosimeter != null) {
                    if (this._dosimeter.CPM > this._last_cpm) {
                        this._last_angle = this._angle.value;
                        this._last_cpm = this._dosimeter.CPM;
                    }
                }

                if (this._angle.value == 360) {
                    if (this._arrows.length > 10) {
                        this._arrows.shift();
                    }
                    this._arrows.push(new Arrow(this.Position(), this._last_angle, this._last_cpm));

                    this._angle.value = 0;
                    this._last_angle = 0;
                    this._last_cpm = 0;
                    this._state_counter = this._second_mode_distance.value;
                    this._state = 1;
                }
            } else if (this._state == 1) {
                this._state_counter -= Math.abs(this.Advance(time_delta) / SCALE);

                if (this._state_counter < 0) {
                    this._state = 0;
                }
            }
        }
    }

    public Advance(time_delta: number) {
        const diff = this.Direction() * this._velocity.value * SCALE * time_delta;
        const [roadPosition, changeDirection] = this._road.NextPosition(this._roadPosition.value, diff);
        this._roadPosition.value = roadPosition;
        if (changeDirection) {
            this._direction.value = !this._direction.value;
        }
        this._position.value = this._road.GetPosition(this._roadPosition.value);

        return diff;
    }

    public Draw(graphics: Graphics): void {
        graphics.DrawShape(this._position.value, this._shape);
        graphics.Stroke();

        graphics.DrawShape(this._position.value, ARROW.Rotate(radians(this._angle.value)));
        graphics.Fill();

        for (let arrow of this._arrows) {
            arrow.Draw(graphics);
        }
    }

    SetDosimeter(dosimeter: Dosimeter) {
        this._dosimeter = dosimeter;
    }
}