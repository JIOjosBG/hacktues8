const temperature_diagram = document.getElementById("temperature-chart").getContext("2d");

const labels = ["09.03.2022", "10.03.2022", "11.03.2022", "12.03.2022", "13.03.2022", "14.03.2022", "15.03.2022", "16.03.2022", "17.03.2022"];

let gradient = temperature_diagram.createLinearGradient(0,0,0,450);
// gradient.addColorStop(0, "rgba(255, 87, 51, 1)");
// gradient.addColorStop(0.5, "rgba(255, 87, 51, 0.5)");
// gradient.addColorStop(1, "rgba(255, 87, 51, 0 )");

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
// Chart.defaults.elements.line.borderColor = '#C70039';
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
            data: [-1535, 453,1345,435,345,-850,890, 245, 909],
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