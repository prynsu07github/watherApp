const apiKey="22dbfae120cbc28f57b0c3ad0c12a9e4"
const weatherData = document.querySelector(".weather-data")
const cityInput=document.getElementById("city-input")
const Form=document.querySelector("form")
Form.addEventListener("submit" , ()=>{
    event.preventDefault()//-------> its used to stop the reloading of web page while click submit button in form
    const cityName = cityInput.value
    getWeatherData(cityName)
}
)

 async function getWeatherData(city){
    try{
        const respondFromWeb=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        if(!respondFromWeb.ok){
            throw new Error("there is problem in fetching data!!!!!!!!!!!")
        }
        const data=await respondFromWeb.json()
        const temperature=Math.floor(data.main.temp) 
        //document.querySelector(".temperature").textContent=`${temperature}`
        //or
        //await console.log(data)
        const description=data.weather[0].description
        const weatherIcon=data.weather[0].icon
        const details=[
            `Feels like :${Math.floor(data.main.feels_like)}°C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind Speed : ${data.wind.speed} m/s`,
        ]

      weatherData.querySelector(".weather-icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="sunny">`
      document.querySelector(".temperature").textContent=`${temperature}°C`
      document.querySelector(".description").textContent=`${description}`
      document.querySelector(".details").innerHTML=details.map((details)=>`<div>${details}</div>`).join("")
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}

