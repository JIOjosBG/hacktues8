const array_for_temperatures = [];
const array_for_humidity = [];
const array_for_dates = [];
const array_for_lightness = [];
const array_for_pressure = [];

export async function takeParameters()
{
    try
    {
        let result = await fetch('http://85.90.247.66/api/measurements-list/1');
       // let result = await fetch(`http://85.90.247.66/api/measurements-list/${baseNumber}`);
        let data = await result.json();

        let pushed_data = 0;

        for(let i = data.length - 1; i >= 0; i--)
        {
            if(pushed_data < 10)
            {
                let fixed_temperatures = data[i].temperature.toFixed(2);
                let date = new Date(data[i].measured_at);
                let fixed_date = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getHours();                

                array_for_temperatures.unshift(fixed_temperatures);
                array_for_humidity.unshift(data[i].humidity);
                array_for_dates.unshift(fixed_date);
                array_for_lightness.unshift(data[i].light);
                array_for_pressure.unshift(data[i].pressure);

                pushed_data++

               /*  console.log(pushed_data);

                console.log(pushed_data);
                console.log(array_for_humidity);
                console.log(array_for_dates);
                console.log(array_for_lightness);
                console.log(array_for_pressure);  */
            }

            else
            {
                break;
            }
        }
    }
    catch(error)
    {
        console.log("The API can't be open");
    } 
}

export async function waiting()
{
    await takeParameters();
}

export function temperatures()
{
    return array_for_temperatures;
}

export function dates()
{
    return array_for_dates;
}

export function humidity()
{
    return array_for_humidity;
}

export function light()
{
    return array_for_lightness;
}

export function pressure()
{
    return array_for_pressure;
}
