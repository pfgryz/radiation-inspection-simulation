import {Ref} from "./core/ref";
import {IDrawable} from "./core/interfaces";
import {Graphics} from "./core/graphics";
import {Road} from "./road";
import {Vector2} from "./core/vector2";
import {SCALE} from "./rover";

export type ResponseCallback = (angle: number) => number;

const DEG_30 = 30 / 180 * Math.PI;
const DEG_60 = 60 / 180 * Math.PI;
const DEG_90 = 90 / 180 * Math.PI;

export function UniversalResponse(angle: number): number {
    if (angle < DEG_30)  {
        return 1 - 0.1 / DEG_30 * angle;
    } else if (angle < DEG_60) {
        return 0.9 - 0.15 / DEG_30 * (angle - DEG_30);
    } else if (angle < DEG_90) {
        return 0.75 - 0.15 / DEG_30 * (angle - DEG_60);
    }

    return 0.6;
}

export class Source implements IDrawable {
    private _position: Ref<number>;
    private _intensity: Ref<number>;
    private _accelerator: Road;

    constructor(position: Ref<number>, intensity: Ref<number>, accelerator: Road) {
        this._position = position;
        this._intensity = intensity;
        this._accelerator = accelerator;
    }

    Position(): Vector2 {
        return this._accelerator.GetPosition(this._position.value * this._accelerator.Length);
    }

    Draw(graphics: Graphics): void {
        const position = this.Position();
        graphics.DrawCircle(position, 10);
        graphics.Stroke();
    }

    Radiation(point: Vector2, response: ResponseCallback | null = null, other: Vector2 | null = null): number {
        const vector = this.Position().Subtract(point);
        const distance = vector.Magnitude() / SCALE;

        if (other == null) {
            other = new Vector2(1, 0);
        }

        if (response != null) {
            const angle = Math.acos(
                (vector.x * other.x + vector.y * other.y) / (vector.Magnitude() * other.Magnitude())
            );
            return this._intensity.value * response(angle) / (distance * distance);
        }

        return this._intensity.value / (distance * distance);
    }
}