import {RefreshTemperatureChart} from './charts.js';

const temperature_diagram = document.getElementById("temperature-chart").getContext("2d");
console.log(temperature_diagram);

const array_temp = [0,5,2,5,7,9,13];

function setBase(value)
{
    if(value == 2)
    {
        RefreshTemperatureChart(array_temp)
    }
    //await take_temperatures(value);
    console.log(value);
}

window.onload = setBase(1);