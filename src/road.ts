import {Vector2} from "./core/vector2";

export class Road {
    public Begin: Vector2;
    public End: Vector2;
    private readonly _length: number;

    constructor(begin: Vector2, end: Vector2) {
        this.Begin = begin;
        this.End = end;
        this._length = this.Begin.Subtract(this.End).Magnitude();
    }

    public get Length(): number {
        return this._length;
    }

    public NextPosition(position: number, delta: number): [number, boolean] {
        if (position + delta > this._length) {
            return [2 * this._length - position - delta, true];
        }

        if (position + delta < 0) {
            return [-(position + delta), true];
        }

        return [position + delta, false];

    }

    public GetPosition(position: number): Vector2 {
        position = position / this._length;
        const diff = this.End.Subtract(this.Begin);
        return this.Begin.Add(diff.Scale(position));
    }
}