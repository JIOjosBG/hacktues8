export async function take_temperatures()
{
    const array_for_temperatures = [];

    try
    {
        let result = await fetch('http://85.90.247.66/api/measurements-list/1');
        let data = await result.json();

        for(let i = data.length - 1; i >= 0; i--)
        {
            if(array_for_temperatures.length < 10)
            {
                let fixed_temperatures = data[i].temperature.toFixed(2);
                array_for_temperatures.unshift(fixed_temperatures);
            }
        }
        
        console.log(array_for_temperatures);
        return array_for_temperatures;
        
    }
    catch(error)
    {
        console.log(2);
    } 
}