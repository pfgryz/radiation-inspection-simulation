import {Simulation} from "./simulation";
import {Graphics} from "./core/graphics";
import {Parameters} from "./parameters";
import {initChart} from "./ui/cpm";

function start() {
    const canvas = document.getElementById("simulation") as HTMLCanvasElement;
    const parametersContainer = document.getElementById("parameters") as HTMLElement;

    const graphics = new Graphics(canvas);
    const parameters = new Parameters(parametersContainer);
    const simulation = new Simulation(graphics, parameters);

    parameters.OnStart.value = () => {
        simulation.Start();
    }
    parameters.OnStop.value = () => {
        simulation.Stop();
    }
    parameters.OnStep.value = () => {
        simulation.Step();
    }
    parameters.OnReset.value = () => {
        simulation.Reset();
    }

    initChart();
}

(() => {
    start()
})()