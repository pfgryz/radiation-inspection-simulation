export class TicksCounter {
    private _interval: number | null;
    private _tps: number;
    public Ticks: number;

    constructor() {
        this._interval = null;
        this._tps = 0;
        this.Ticks = 0;
    }

    public Start() {
        if (this._interval == null) {
            this._interval = setInterval(() => {
                this._tps = this.Ticks * 10;
                this.Ticks = 0;
            }, 100);
        }
    }

    public Stop() {
        if (this._interval != null) {
            clearInterval(this._interval);
        }
    }

    public get TPS(): string {
        return this._tps.toString();
    }
}