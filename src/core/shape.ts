import {Vector2} from "./vector2";

export class Shape {
    private readonly _vertices: Vector2[];

    constructor(vertices: Vector2[]) {
        this._vertices = vertices;
    }

    get vertices(): Vector2[] {
        return this._vertices;
    }

    public Scale(scale: number): Shape {
        return new Shape(
            this.vertices.map((v) => v.Scale(scale))
        )
    }

    public Rotate(angle: number): Shape {
        return new Shape(
            this.vertices.map((v) => v.Rotate(Vector2.Zero, angle))
        )
    }
}