import {
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    LineElement,
    LineController,
    PointElement,
    Title,
    Tooltip,
    Legend
);

interface UIChartOptions {
    label?: string,
    color?: string,
    xTitle?: string,
    yTitle?: string,
}

export class UIChart {
    private _canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D;
    private _chart: Chart;

    constructor(canvas: HTMLCanvasElement, {label, color = 'rgba(75, 192, 192, 1)', xTitle, yTitle}: UIChartOptions) {
        this._canvas = canvas;
        this._context = this._canvas.getContext("2d")!;
        this._chart = new Chart(
            this._context,
            {
                type: "line",
                data: {
                    labels: [],
                    datasets: [{
                        label: label,
                        data: [],
                        borderColor: color,
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: xTitle,
                                color: "#fff"
                            },
                            grid: {
                                color: "#666"
                            },
                            ticks: {
                                color: "#fff"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: yTitle,
                                color: "#fff"
                            },
                            grid: {
                                color: "#666"
                            },
                            ticks: {
                                color: "#fff"
                            },
                            beginAtZero: true
                        }
                    }
                }
            }
        );
    }

    public Update() {
        this._chart.update();
    }

    public get Labels(): unknown[] {
        return this._chart.data.labels!;
    }

    public get Data(): unknown[] {
        return this._chart.data.datasets[0].data!;
    }

    Reset() {
        while (this.Labels.length > 0) {
            this.Labels.pop();
        }
        while (this.Data.length > 0) {
            this.Data.pop();
        }

        this.Update();
    }
}