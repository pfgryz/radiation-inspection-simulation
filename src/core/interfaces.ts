import {Vector2} from "./vector2";
import {Graphics} from "./graphics";

export interface IUpdate {
    Update(time_delta: number): void;
}

export interface IDrawable {
    Draw(graphics: Graphics): void;
}

export interface IPosition {
    Position(): Vector2;
}