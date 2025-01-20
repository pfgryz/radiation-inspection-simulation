import {Ref} from "./core/ref";
import {NumberParameter} from "./core/parameters/number_parameter";

export class Parameters {
    private _fps_parameter: NumberParameter;
    private _speed_parameter: NumberParameter;
    private _velocity_parameter: NumberParameter;
    private _angle_parameter: NumberParameter;

    constructor(container: HTMLElement) {
        this._fps_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="fps"]')[0] as HTMLElement,
            {
                Min: 1,
                Max: 60,
                Step: 1,
                Default: 10
            },
            "FPS"
        );
        this._speed_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="speed"]')[0] as HTMLElement,
            {
                Min: 0.1,
                Max: 100,
                Step: 0.1,
                Default: 1
            },
            "Simulation Speed"
        );
        this._velocity_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="velocity"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 6,
                Step: 0.1,
                Default: 1
            }
        );
        this._angle_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="angle"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 360,
                Step: 1,
                Default: 0
            }
        );
    }

    public get FPS(): Ref<number> {
        return this._fps_parameter.Value;
    }

    public get Speed(): Ref<number> {
        return this._speed_parameter.Value;
    }

    public get Velocity(): Ref<number> {
        return this._velocity_parameter.Value;
    }

    public get Angle(): Ref<number> {
        return this._angle_parameter.Value;
    }
}