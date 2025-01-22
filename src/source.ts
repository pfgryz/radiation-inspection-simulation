import {Ref} from "./core/ref";
import {IDrawable} from "./core/interfaces";
import {Graphics} from "./core/graphics";
import {Road} from "./road";

export class Source implements IDrawable {
    private _position: Ref<number>;
    private _intensity: Ref<number>;
    private _accelerator: Road;

    constructor(position: Ref<number>, intensity: Ref<number>, accelerator: Road) {
        this._position = position;
        this._intensity = intensity;
        this._accelerator = accelerator;
    }

    Draw(graphics: Graphics): void {
        const position = this._accelerator.GetPosition(this._position.value * this._accelerator.Length);
        graphics.DrawCircle(position, 10);
        graphics.Stroke();
    }
}