import {Radiation} from "./radiation";
import {Rover} from "./rover";
import {IUpdate} from "./core/interfaces";
import {UIChart} from "./ui/chart";
import {UniversalResponse} from "./source";

export class Dosimeter implements IUpdate {
    private _rover: Rover;
    private _radiation: Radiation;
    private _cpm: number;
    private _dose: number;
    private _doserate: number;
    private _lastDraw: number;
    private _counter: number;
    private _cpm_chart: UIChart;
    private _doserate_chart: UIChart;
    private _dose_chart: UIChart;

    constructor(rover: Rover, radiation: Radiation) {
        this._rover = rover;
        this._radiation = radiation;
        this._cpm = 0;
        this._doserate = 0;
        this._dose = 0;
        this._lastDraw = 0;
        this._counter = 0;

        this._cpm_chart = new UIChart(
            document.getElementById("cpm-chart")! as HTMLCanvasElement,
            {
                label: "CPM",
                xTitle: "Time",
                yTitle: "CPM",
            }
        );
        this._doserate_chart = new UIChart(
            document.getElementById("sivert-chart")! as HTMLCanvasElement,
            {
                label: "Dose rate [uSv/h]",
                xTitle: "Time",
                yTitle: "uSv/h",
            }
        );
        this._dose_chart = new UIChart(
            document.getElementById("dose-chart")! as HTMLCanvasElement,
            {
                label: "Dose [uSv]",
                xTitle: "Time",
                yTitle: "uSv",
            }
        );
    }

    Reset() {
        this._dose = 0;
        this._counter = 0;
        this._lastDraw = 0;
        this._cpm_chart.Reset();
        this._doserate_chart.Reset();
        this._dose_chart.Reset();
    }

    Update(time_delta: number): void {
        this._cpm = this.CPM;
        this._doserate = this._cpm / 5;
        this._dose += this._doserate * (time_delta / 3600);
        this._lastDraw += time_delta;

        if (this._lastDraw > 0) {
            this._lastDraw -= 1;
            this._counter += 1;

            this.UpdateChart(this._cpm_chart, this._cpm, `t+${this._counter}`);
            this.UpdateChart(this._doserate_chart, this._doserate, `t+${this._counter}`);
            this.UpdateChart(this._dose_chart, this._dose, `t+${this._counter}`);
        }
    }

    public get CPM(): number {
        return this._radiation.RadiationAt(this._rover.Position(), UniversalResponse, this._rover.View());
    }

    private UpdateChart(chart: UIChart, value: number, label: string): void {
        if (chart.Labels.length > 50) {
            chart.Labels.shift();
            chart.Data.shift();
        }

        chart.Labels.push(label);
        chart.Data.push(value);
        chart.Update();
    }
}