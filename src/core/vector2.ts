export class Vector2 {
    private _x: number;
    private _y: number;

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

    Subtract(other: Vector2) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
}