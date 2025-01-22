export class Vector2 {
    private _x: number;
    private _y: number;
    static Zero: Vector2 = new Vector2(0, 0);

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    Magnitude(): number {
        return Math.sqrt(this.SqrMagnitude())
    }

    SqrMagnitude(): number {
        return this.x * this.x + this.y * this.y;
    }

    Normalize(): Vector2 {
        const magnitude = this.Magnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    Add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    Subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    Mul(other: Vector2): Vector2 {
        return new Vector2(
            this.x * other.x,
            this.y * other.y
        );
    }

    Div(other: Vector2): Vector2 {
        return new Vector2(
            this.x / other.x,
            this.y / other.y
        );
    }

    Scale(scale: number) {
        return new Vector2(this.x * scale, this.y * scale);
    }

    Rotate(reference: Vector2, angle: number): Vector2 {
        const offset = this.Subtract(reference);
        const cosValue = Math.cos(angle);
        const sinValue = Math.sin(angle);

        const rotated = new Vector2(
            offset.x * cosValue - offset.y * sinValue,
            offset.x * sinValue + offset.y * cosValue
        );

        return rotated.Add(reference);
    }

    Clone(): Vector2 {
        return new Vector2(
            this.x, this.y
        );
    }

    Int(method: (x: number) => number = Math.round): Vector2 {
        return new Vector2(
            method(this.x),
            method(this.y)
        )
    }
}