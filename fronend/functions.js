const array_for_temperatures = [];

export async function takeParameters()
{
    try
    {
        let result = await fetch('http://85.90.247.66/api/measurements-list/1');
       // let result = await fetch(`http://85.90.247.66/api/measurements-list/${baseNumber}`);
        let data = await result.json();


        for(let i = data.length - 1; i >= 0; i--)
        {
            if(array_for_temperatures.length < 10)
            {
                let fixed_temperatures = data[i].temperature.toFixed(2);
                array_for_temperatures.unshift(fixed_temperatures);
            }
        }
       
    }
    catch(error)
    {
        console.log(2);
    } 
}

export async function temperatures()
{
    await takeParameters();
    console.log(array_for_temperatures.length)
    return array_for_temperatures;
}
