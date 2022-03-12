async function lastParametersFetching() 
{
    try 
    {
        let result = await fetch('http://85.90.247.66/api/measurement-last/');
        let data = await result.json(); 
        
        document.getElementById('last-temperature').innerHTML = (data.temperature).toFixed(2) + ' °C';
        document.getElementById('last-humidity').innerHTML = data.humidity + '%';
        document.getElementById('last-light').innerHTML = data.light + '%';
    }
    catch(error)
    {
        console.log("The API for last parameters can't be open");
    }

    //най светлно 4096
}

lastParametersFetching();
setInterval(lastParametersFetching, 600000);