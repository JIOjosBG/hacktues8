async function lastParametersFetching() 
{
    try 
    {
        let result = await fetch('http://85.90.247.66/api/measurement-last/');
        let data = await result.json(); 

        let isWindy = data.wind == 0 ? "Not windy" : "Windy";
        let isSafe = data.safe < 0.4 ? "Not safe" : "Safe";
        
        document.getElementById('last-light').innerHTML = (((data.light)/4096)*100).toFixed(2) + '%';
        document.getElementById('last-temperature').innerHTML = (data.temperature).toFixed(2) + ' °C';
        document.getElementById('last-humidity').innerHTML = data.humidity + '%';
        document.getElementById('last-wind').innerHTML = isWindy;
        document.getElementById('last-pressure').innerHTML = ((data.pressure)/1000).toFixed(1) + 'kPa';
        document.getElementById('last-safety').innerHTML = isSafe;

    }
    catch(error)
    {
        console.log("The API for last parameters can't be open");
    }

}

lastParametersFetching();
//setInterval(lastParametersFetching, 600000);