import {UIChart} from "./chart";

function updateChart(chart: UIChart) {
    if (chart.Labels.length > 10) {
        chart.Labels.shift();
        chart.Data.shift();
    }

    chart.Labels.push("T");
    chart.Data.push(Math.random() * 10);

    chart.Update();
}

export function initChart() {
    let chart = new UIChart(
        document.getElementById("myChart")! as HTMLCanvasElement,
        {
            label: "CPM",
            xTitle: "Time",
            yTitle: "CPM",
        }
    );

    setInterval(() => {
        updateChart(chart)
    }, 1000);
}