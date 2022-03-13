const arrayForTemperatures = [];
const arrayForHumidity = [];
const arrayForDates = [];
const arrayForLightness = [];
const arrayForPressure = [];
const arrayForWind = [];

export async function takeParameters()
{
    try
    {
        let result = await fetch('http://85.90.247.66/api/measurements-list/1');
        let data = await result.json();

        let pushed_data = 0;

        for(let i = data.length - 1; i >= 0; i--)
        {
            if(pushed_data < 10)
            {
                let fixedTemperatures = data[i].temperature.toFixed(2);
                let date = new Date(data[i].measured_at);
                let fixedDate = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getHours();                

                arrayForTemperatures.unshift(fixedTemperatures);
                arrayForHumidity.unshift(data[i].humidity);
                arrayForDates.unshift(fixedDate);
                arrayForLightness.unshift((((data[i].light)/4096)*100).toFixed(2));
                arrayForPressure.unshift(((data[i].pressure)/1000).toFixed(0));
                arrayForWind.unshift(data[i].wind);

                pushed_data++
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
    return arrayForTemperatures;
}

export function dates()
{
    return arrayForDates;
}

export function humidity()
{
    return arrayForHumidity;
}

export function light()
{
    return arrayForLightness;
}

export function pressure()
{
    return arrayForPressure;
}

export function wind()
{
    return arrayForWind;
}
