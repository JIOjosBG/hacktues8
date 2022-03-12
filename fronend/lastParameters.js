async function lastParametersFetching() 
{
    try 
    {
        let result = await fetch('http://85.90.247.66/api/measurement-last/');
        let data = await result.json(); 
        
        document.getElementById('last-light').innerHTML = (((data.light)/4096)*100).toFixed(2) + '%';
        document.getElementById('last-temperature').innerHTML = (data.temperature).toFixed(2) + ' °C';
        document.getElementById('last-humidity').innerHTML = data.humidity + '%';
        document.getElementById('last-wind').innerHTML = data.wind;
        document.getElementById('last-pressure').innerHTML = ((data.pressure)/1000).toFixed(1) + 'kPa';

    }
    catch(error)
    {
        console.log("The API for last parameters can't be open");
    }

    //най светлно 4096
}

lastParametersFetching();
//setInterval(lastParametersFetching, 600000);