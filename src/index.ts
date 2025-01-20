import {Simulation} from "./simulation";
import {Graphics} from "./core/graphics";
import {Parameters} from "./parameters";

function start() {
    const canvas = document.getElementById("simulation") as HTMLCanvasElement;
    const parametersContainer = document.getElementById("parameters") as HTMLElement;

    const graphics = new Graphics(canvas);
    const parameters = new Parameters(parametersContainer);
    const simulation = new Simulation(graphics, parameters);
    simulation.Start();
}

(() => {
    start()
})()