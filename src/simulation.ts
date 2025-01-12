import {Graphics} from "./core/graphics";
import {Parameters} from "./parameters";
import {Vector2} from "./core/vector2";
import {Rover} from "./rover";

export class Simulation {
    private readonly resolution: number;
    private interval: number | null;

    private readonly graphics: Graphics;
    private parameters: Parameters;
    private rover: Rover;

    constructor(graphics: Graphics, parameters: Parameters, resolution: number) {
        this.resolution = resolution;
        this.interval = null;

        this.graphics = graphics;
        this.parameters = parameters;

        this.rover = new Rover(new Vector2(200, 100), parameters.Velocity);
    }

    public Start(): void {
        if (this.interval == null) {
            this.interval = setInterval(() => {
                this.Update();
                this.Draw();
            }, this.resolution);
        }
    }

    public Stop(): void {
        if (this.interval != null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    public Update(): void {
        this.rover.Update(this.resolution);
    }

    public Draw(): void {
        this.graphics.Clear();
        this.rover.Draw(this.graphics);
    }
}