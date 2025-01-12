import {Vector2} from "./vector2";
import {Shape} from "./shape";
import {Color} from "./color";

export class Graphics {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = canvas.getContext("2d")!;

        this.Resize();
    }

    public Resize(): void {
        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;
    }

    // region Clear
    public Clear(): void {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public ClearRectangle(x: number, y: number, width: number, height: number): void {
        this._context.clearRect(x, y, width, height);
    }

    // endregion

    // region Drawing
    public DrawLine(from: Vector2, to: Vector2): void {
        this._context.beginPath();
        this._context.moveTo(from.x, from.y);
        this._context.lineTo(to.x, to.y);
        this._context.closePath();
    }

    public DrawRectangle(from: Vector2, width: number, height: number): void {
        this._context.beginPath();
        this._context.moveTo(from.x, from.y);
        this._context.lineTo(from.x + width, from.y);
        this._context.lineTo(from.x + width, from.y + height);
        this._context.lineTo(from.x, from.y + height);
        this._context.lineTo(from.x, from.y);
        this._context.closePath();
    }

    public DrawShape(position: Vector2, shape: Shape): void {
        if (shape.vertices.length == 0) {
            return;
        }

        const first = shape.vertices[0];

        this._context.beginPath();
        this._context.moveTo(first.x + position.x, first.y + position.y);

        for (let vertex of shape.vertices) {
            this._context.lineTo(vertex.x + position.x, vertex.y + position.y);
        }
        this._context.lineTo(first.x + position.x, first.y + position.y);
        this._context.closePath();
    }

    // endregion

    // region Filling
    public Fill(style: string = Color.Black) {
        this._context.fillStyle = style;
        this._context.fill();
    }

    public Stroke(style: string = Color.Black) {
        this._context.strokeStyle = style;
        this._context.stroke();
    }

    // endregion
}

