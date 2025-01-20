import {Ref} from "./core/ref";
import {NumberParameter} from "./core/parameters/number_parameter";

export class Parameters {
    private _velocity_parameter: NumberParameter;
    private _angle_parameter: NumberParameter;

    constructor(container: HTMLElement) {
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

    public get Velocity(): Ref<number> {
        return this._velocity_parameter.Value;
    }

    public get Angle(): Ref<number> {
        return this._angle_parameter.Value;
    }
}