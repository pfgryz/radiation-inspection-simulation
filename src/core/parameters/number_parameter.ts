import {Parameter} from "./parameter";
import {Ref, watch} from "../ref";
import {capitalize} from "../helpers";

export interface NumberParameterOptions {
    Min: number,
    Max: number,
    Step: number,
    Default: number,
}

export class NumberParameter implements Parameter<number> {
    private readonly _value: Ref<number>;
    private readonly _input: HTMLInputElement;
    private readonly _display: HTMLElement;
    private _format: (x: number) => string;

    constructor(container: HTMLElement, {Min = 0, Max = 1, Step = 0.1, Default = 0}: NumberParameterOptions, title: string | null = null, format?: (x: number) => string) {
        const id = container.getAttribute("data-parameter-name")!;

        const label = document.createElement("label");
        label.htmlFor = id;
        label.innerText = title || `${capitalize(id)}:`;

        const defaultFormat = (x: number): string => x.toString();
        this._format = format || defaultFormat;

        this._input = document.createElement("input");
        this._input.id = id;
        this._input.type = "range";
        this._input.min = Min.toString();
        this._input.max = Max.toString();
        this._input.step = Step.toString();
        this._input.value = Default.toString();

        this._display = document.createElement("span");
        this._display.className = "parameter-value";

        container.appendChild(label);
        container.appendChild(this._input);
        container.appendChild(this._display);

        this._value = new Ref<number>(
            parseFloat(this._input.value)
        );
        this._input.oninput = (e) => {
            this.OnChange(e)
        };

        watch(() => {
            this._display.innerHTML = this._format(this._value.value).toString();
        });
    }

    get Value(): Ref<number> {
        return this._value;
    }

    private OnChange(event: Event): void {
        this._value.value = parseFloat(this._input.value);
    }
}