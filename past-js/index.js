let lat
let lon
let dados
let cityname;
let cod
let DayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","friday","Saturday","Sunday","Monday"];
$(document.querySelectorAll(".dataWeather")).hide();
async function pegaCord(city,State,contry)
{
    
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${State},${contry}&limit=1&appid=6479388e7cc13f27ad7b24fe6fbb1454`)
    try{
        const json = await data.json();
        lat = await json[0].lat;
        lon = await json[0].lat;
        cityname = await json[0].name;
        await pegarWeather()
    }
    catch(e)
    {
        console.log(e)
    }
}

    async function pegarWeather()
    {
        const data = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=6479388e7cc13f27ad7b24fe6fbb1454&units=metric&lang=pt_br&`)
        const json = await data.json();
        dados = await json;
        RetornarWeather()
    }

    function RetornarWeather()
    {
        var text;
        var img;
        var Day = new Date();
        Day = Day.getDay();

        dados.daily.forEach((item,index)=> {
            if(index<1)
            {
            img = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
            text = `<p class="cityname">${cityname}</p>`+
            `<p class="temp">${Math.round(dados.current.temp)}°C</p>`+
            `<p class="descricao">${item.weather[0].description}</p>`+
            `<img class="icone" src=${img} alt="clima">`+
            `<p class="tempMax">Max:${Math.round(item.temp.max)}°C</p>`+
            `<p class="tempMin">Min:${Math.round(item.temp.min)}°C</p>`
            document.querySelectorAll(".dataWeather")[index].innerHTML = text
            }
            else{
                if(index<4)
                {
                    img = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
                    text = `<p class="cityname">${DayOfWeek[Day+index]}</p>`+
                    `<p class="descricao">${item.weather[0].description}</p>`+
                    `<img class="icone" src=${img} alt="clima">`+
                    `<p class="tempMax">Max:${Math.round(item.temp.max)}°C</p>`+
                    `<p class="tempMin">Min:${Math.round(item.temp.min)}°C</p>`
                    document.querySelectorAll(".dataWeather")[index].innerHTML = text
                }
            }
        });
    }

    $(window).ready(()=>{
        $("#btnSearchId").click(()=>{
            var city = document.querySelector("#city").value;
            var state = document.querySelector("#state").value;
            var country = document.querySelector("#country").value;
            pegaCord(city,state,country)
            for(var i=0;i<4;i++)
            {
                $(document.querySelectorAll(".dataWeather")[i]).show()
                document.querySelectorAll(".dataWeather")[i].style.cssText = "transition: 2s;opacity:0.8;"
            }
        })
    })


    let category = "AM";
    let day = new Date();
    let hour = new Date();  
    let min = new Date();
    let text;
    
    $(function(){
    hour = hour.getHours();
    min = min.getUTCMinutes();
    day = day.getDay();
    if(hour>12)
    {
        category = "PM";
        hour -= 12;
    }
    if(min<10)
    {
        min = "0"+min
    }
    text = `<p class="time">${hour}:${min} ${category}</p>`+
           `<p class="date">${DayOfWeek[day]}</p>`

    document.querySelector(".dateTime").innerHTML = text;
    })
