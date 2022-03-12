import {waiting,takeParameters, temperatures, dates, humidity, light, pressure} from './fetchFuncs.js';

const temperature_diagram = document.getElementById("temperature-chart").getContext("2d");
await waiting();

const labels = dates();

let gradient = temperature_diagram.createLinearGradient(0,0,0,450);

gradient.addColorStop(0, "rgba(144,224,239, 1)");
gradient.addColorStop(0.5, "rgba(144,224,239, 0.5)");
gradient.addColorStop(1, "rgba(144,224,239, 0 )");

Chart.defaults.elements.point.hoverRadius = 5;
Chart.defaults.elements.point.hitRadius = 30;
Chart.defaults.elements.point.backgroundColor = 'black'; 
Chart.defaults.elements.point.borderWidth = 0.2; 
Chart.defaults.elements.point.borderColor = 'black'; 
Chart.defaults.elements.line.tension = 0.3;
Chart.defaults.elements.line.borderWidth = 3;
Chart.defaults.elements.line.borderColor = '#90E0EF';


Chart.defaults.font.size = 15;

let delayed;

const plugin = 
{
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) =>
    {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = "rgba(250, 50, 50, 0.6";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
  };

const data = 
{
    labels,
    datasets: 
    [
        {
            data: temperatures(),
            fill: true,
        }
    ]
};

const configurations_for_labels_charts = 
{
    type: 'line',
    data : data,
    plugins: [plugin],
    options:
    {
        plugins:
        {   
            title: 
            {
                display: true,
                text: 'Predicted world population (millions) in 2050',
                color: '#511845',
                font:
                {
                    size: 18,
                }
            },

            legend: 
            {
              display: false
            },
        }, 

        responsive: true,
        animation: 
        {
            onComplete: () => 
            {
              delayed = true;
            },
            delay: (context) =>
            {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) 
              {
                delay = context.dataIndex * 200 + context.datasetIndex * 60;
              }
              return delay;
            }
        },

        scales: {
            y: 
            {
              ticks:
              {
                // color: "#511845",
                color: "#511845",
                fontSize: 20,
                callback: function(value)
                {
                    return value + "°C";
                },
              },
              grid:
              {
                 display : false,
              },
            },

            x: 
            {
                ticks:
                {
                    // color: "#511845",
                    color: "#03045E",

                },

                grid:
                {
                    display : false,
                },
            },

        },

        backgroundColor: gradient, 
        maintainAspectRatio: true,
    }
}

const myChart = new Chart(temperature_diagram, configurations_for_labels_charts);

/* function RefreshTemperatureChart(array_temp)
{
    console.log(myChart.data.datasets);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
     
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });

    myChart.update();
}

/* let sensor_information;
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

window.onload = setBase(1);*/