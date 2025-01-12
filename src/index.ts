import { Rover } from "./rover";

console.log('Happy developing ✨')
let rover = new Rover("Test");

function start() {
    alert("Started")
}

(() => {
    start()
})()