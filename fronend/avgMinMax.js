function makeData(dailies, data)
{
    for(let i = 0; i < dailies.length - 2; i += 3)
        {
            if(i < 3)
            {
                dailies[i].innerHTML += data["max_data"].temperature.toFixed(2) + '°C';
                dailies[i+1].innerHTML += data["av_data"].temperature.toFixed(2) + '°C';
                dailies[i+2].innerHTML += data["min_data"].temperature.toFixed(2) + '°C';
            }

            else if(i < 6)
            {
                dailies[i].innerHTML += data["max_data"].humidity.toFixed(2) + '%';
                dailies[i+1].innerHTML += data["av_data"].humidity.toFixed(2) + '%';
                dailies[i+2].innerHTML += data["min_data"].humidity.toFixed(2) + '%';
            }

            else if(i < 9)
            {
                dailies[i].innerHTML += ((data["max_data"].light/ 4096)*100).toFixed(2) + '%';
                dailies[i+1].innerHTML += ((data["max_data"].light/ 4096)*100).toFixed(2)  + '%';
                dailies[i+2].innerHTML += ((data["max_data"].light/ 4096)*100).toFixed(2)  + '%';
            }
            
            else if(i < 12)
            {
                dailies[i].innerHTML += data["max_data"].pressure.toFixed(2) + 'kPa';
                dailies[i+1].innerHTML += data["av_data"].pressure.toFixed(2)+ 'kPa';
                dailies[i+2].innerHTML += data["min_data"].pressure.toFixed(2) + 'kPa';
            }

            else
            {
                dailies[i].innerHTML += data["max_data"].wind.toFixed(2);
                dailies[i+1].innerHTML += data["av_data"].wind.toFixed(2);
                dailies[i+2].innerHTML += data["min_data"].wind.toFixed(2);
            }
        }
}

async function dayParametersFetching() 
{
    try 
    {
        let result_day = await fetch('http://85.90.247.66/api/average-min-max/day/1');
        let data_day = await result_day.json(); 

        let result_week = await fetch('http://85.90.247.66/api/average-min-max/week/1');
        let data_week = await result_week.json();
        
        let result_month = await fetch('http://85.90.247.66/api/average-min-max/month/1');
        let data_month = await result_month.json();


        const dailies = document.getElementsByClassName("--daily");
        const weeklies = document.getElementsByClassName("--weekly");
        const monthlies = document.getElementsByClassName("--monthly");

        console.log(monthlies);
        
        makeData(dailies, data_day);
        makeData(weeklies, data_week);
        makeData(monthlies, data_month);

    }
    catch(error)
    {
        console.log("The API for last parameters can't be open");
    }    
}

dayParametersFetching();