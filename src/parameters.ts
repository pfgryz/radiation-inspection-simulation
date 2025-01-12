import {Ref} from "./core/ref";

export class Parameters {
    private _velocity_parameter: NumberParameter;

    constructor(container: HTMLElement) {
        this._velocity_parameter = new NumberParameter(container.querySelectorAll('[data-parameter-name="velocity"]')[0] as HTMLElement);
    }

    public get Velocity(): Ref<number> {
        return this._velocity_parameter.Value;
    }
}

class NumberParameter {
    private readonly _value: Ref<number>;
    private _input: HTMLInputElement;
    private _display: HTMLElement;

    constructor(container: HTMLElement) {
        console.log(container)
        this._input = container.getElementsByTagName("input")[0];
        this._display = container.getElementsByClassName("parameter-value")[0] as HTMLElement;

        this._value = new Ref<number>(
            parseFloat(this._input.value)
        );

        this._input.onchange = (e) => {
            this.OnChange(e)
        };
    }

    public get Value(): Ref<number> {
        return this._value;
    }

    OnChange(event: Event): void {
        this._display.innerHTML = this._input.value.toString();
        this._value.value = parseFloat(this._input.value);
    }
}