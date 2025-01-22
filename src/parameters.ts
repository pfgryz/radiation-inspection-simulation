import {Ref} from "./core/ref";
import {NumberParameter} from "./core/parameters/number_parameter";

export class Parameters {
    private _fps_parameter: NumberParameter;
    private _tps_parameter: NumberParameter;
    private _speed_parameter: NumberParameter;
    private _velocity_parameter: NumberParameter;
    private _angle_parameter: NumberParameter;
    private _first_source_parameter: NumberParameter;
    private _first_source_intensity_parameter: NumberParameter;
    private _second_source_parameter: NumberParameter;
    private _second_source_intensity_parameter: NumberParameter;
    private _mode_parameter: NumberParameter;
    private _second_mode_distance_parameter: NumberParameter;

    public OnStart: Ref<() => void> = new Ref(() => {});
    public OnStop: Ref<() => void> = new Ref(() => {});
    public OnStep: Ref<() => void> = new Ref(() => {});
    public OnReset: Ref<() => void> = new Ref(() => {})

    constructor(container: HTMLElement) {
        document.getElementById("sim-start")!.onclick = () => {
            this.OnStart.value();
        }
        document.getElementById("sim-stop")!.onclick = () => {
            this.OnStop.value();
        }
        document.getElementById("sim-step")!.onclick = () => {
            this.OnStep.value();
        }
        document.getElementById("sim-reset")!.onclick = () => {
            this.OnReset.value();
        }

        this._fps_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="fps"]')[0] as HTMLElement,
            {
                Min: 1,
                Max: 60,
                Step: 1,
                Default: 20
            },
            "FPS"
        );
        this._tps_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="tps"]')[0] as HTMLElement,
            {
                Min: 1,
                Max: 1000,
                Step: 1,
                Default: 100
            },
            "TPS"
        );
        this._speed_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="speed"]')[0] as HTMLElement,
            {
                Min: 0.1,
                Max: 100,
                Step: 0.1,
                Default: 1
            },
            "Simulation Speed",
            (s) => `x${s}`
        );
        this._velocity_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="velocity"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 6,
                Step: 0.1,
                Default: 1
            },
            null,
            (s) => `${s} m/s`
        );
        this._angle_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="angle"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 360,
                Step: 1,
                Default: 0
            },
            null,
            (s) => `${s}°`
        );
        this._first_source_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="first-source"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 1,
                Step: 0.01,
                Default: 0.3
            },
            null,
            (s) => `${s}`
        );
        this._first_source_intensity_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="first-source-intensity"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 10000,
                Step: 1,
                Default: 0
            },
            null,
            (s) => `${s}`
        );
        this._second_source_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="second-source"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 1,
                Step: 0.01,
                Default: 0.7
            },
            null,
            (s) => `${s}`
        );
        this._second_source_intensity_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="second-source-intensity"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 10000,
                Step: 1,
                Default: 0
            },
            null,
            (s) => `${s}`
        );
        this._mode_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="mode"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 1,
                Step: 1,
                Default: 0
            },
            null,
            (s) => (s == 0 ? "Standard" : "Arrows")
        )
        this._second_mode_distance_parameter = new NumberParameter(
            container.querySelectorAll('[data-parameter-name="second-mode-distance"]')[0] as HTMLElement,
            {
                Min: 0,
                Max: 10,
                Step: 0.25,
                Default: 5
            },
            "Arrow distance:",
            (s) => `${s}m`
        )
    }

    public get FPS(): Ref<number> {
        return this._fps_parameter.Value;
    }

    public get TPS(): Ref<number> {
        return this._tps_parameter.Value;
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

    public get FirstSource(): Ref<number> {
        return this._first_source_parameter.Value;
    }

    public get FirstSourceIntensity(): Ref<number> {
        return this._first_source_intensity_parameter.Value;
    }

    public get SecondSource(): Ref<number> {
        return this._second_source_parameter.Value;
    }

    public get SecondSourceIntensity(): Ref<number> {
        return this._second_source_intensity_parameter.Value;
    }

    public get Mode(): Ref<number> {
        return this._mode_parameter.Value;
    }

    public get SecondModeDistance(): Ref<number> {
        return this._second_mode_distance_parameter.Value;
    }
}