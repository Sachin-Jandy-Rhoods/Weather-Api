import Humidity from "../Assets/humidity.png"
import Wind from "../Assets/wind.png"
import Clear from "../Assets/clear.png"
// import Cloud from "../Assets/cloud.png"
// import Drizzle from "../Assets/drizzle.png"
// import rain from "../Assets/rain.png"
import Search from "../Assets/search.png"
// import Snow from "../Assets/snow.png"
import "./weatherApp.css"
import { useEffect, useRef, useState } from "react"

// Asia:

// Tokyo, Japan
// Seoul, South Korea
// Hong Kong, China
// Singapore
// Mumbai, India
// Bangkok, Thailand
// Beijing, China
// Shanghai, China
// Kuala Lumpur, Malaysia
// Jakarta, Indonesia
// Europe:

// London, UK
// Paris, France
// Berlin, Germany
// Rome, Italy
// Madrid, Spain
// Amsterdam, Netherlands
// Moscow, Russia
// Istanbul, Turkey
// Athens, Greece
// Stockholm, Sweden
// North America:

// New York City, USA
// Los Angeles, USA
// Chicago, USA
// Houston, USA
// Phoenix, USA
// Philadelphia, USA
// Toronto, Canada
// Vancouver, Canada
// Mexico City, Mexico
// South America:

// Rio de Janeiro, Brazil
// Buenos Aires, Argentina
// Lima, Peru
// Santiago, Chile
// Bogotá, Colombia
// Caracas, Venezuela
// Quito, Ecuador
// Montevideo, Uruguay
// Africa:

// Cairo, Egypt
// Lagos, Nigeria
// Johannesburg, South Africa
// Cape Town, South Africa
// Nairobi, Kenya
// Addis Ababa, Ethiopia
// Casablanca, Morocco
// Algiers, Algeria
// Oceania:

// Sydney, Australia
// Melbourne, Australia
// Brisbane, Australia
// Perth, Australia
// Auckland, New Zealand
// Wellington, New Zealand
// Christchurch, New Zealand


export const WeatherApp=()=>{
    const [WeatherData,WeatherApp]=useState(false)
    const inputRef=useRef()
    
    const search=async (city) =>{
        if(city === " "){
            alert("Please enter a city name")
            return;
        }
        try {
            const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            const data=await response.json()
            console.log(data);
            WeatherApp(
                {
                    humidity:data.main.humidity,
                    temperature:Math.floor(data.main.temp),
                    wind:data.wind.speed,
                    location:data.name,
                    Icon:data.weather[0].icon
                }
             )

        } catch (error) {
            WeatherApp(false)
        }
       
    }
   
    useEffect(()=>{
        search()
    },[])
   
    const icon=`https://openweathermap.org/img/wn/${WeatherData.Icon}@2x.png` 
    return(
        <div className="Container">
                <h1 id="head">Weather App</h1>
                <div className="Search">
                     <input ref={inputRef} type="text" />
                     <img src={Search} alt="Search" onClick={()=>{
                        search(inputRef.current.value)
                     }}/>
                </div>
                <img className="WeatherIcon" src={icon||Clear} alt="Weather" />
                <h1 id="deg">{WeatherData.temperature}°C</h1>
                <h2>{WeatherData.location}</h2>
                <div className="parent">
                    <div className="child">
                        <div className="grantChild">
                        <img src={Humidity} alt="Icon" />
                        <div>
                            <h3>{WeatherData.humidity}%</h3>
                            <h3>Humidy</h3>
                        </div>
                        </div>
                    </div>

                    <div className="child">
                        <div className="grantChild">
                        <img src={Wind} alt="Icon" />
                        <div>
                            <h3>{WeatherData.wind} km/hr </h3>
                            <h3>Wind Speed</h3>
                        </div>
                        </div>
                    </div>

                </div>
        </div>
    )
}