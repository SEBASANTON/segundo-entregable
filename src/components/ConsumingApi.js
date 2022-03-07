import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react'

const ConsumingApi = () => {
    const[weather, setWeather] = useState({})
    const[temp, setTemp] = useState()

    const [isDt, setIsDt] = useState(true)


    const success = pos => {
        console.log(pos)
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=78c1016f3054efe86c031c4565ff79fe`)
        .then(res => {
            console.log(res.data);
            setWeather(res.data);
            setTemp(parseInt((res.data?.main?.temp)-273.15)); 

        });  
        
}

    useEffect(() =>{ 
        navigator.geolocation.getCurrentPosition(success);
    },[])
     const convertCelsius=()=>{
        if(isDt){
            setTemp((temp*1.8)+32);
            setIsDt(false);
        }else{
            setTemp((temp-32)/1.8);
            setIsDt(true);
        }
    } 

    return (
        <div className="climate">
            <h1>{weather.name}, {weather.sys?.country}</h1>
            
            <div className ="climate-responsive">
                <div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                </div>
                <div className="buton-num">
                    <p>{parseInt(temp)} {isDt ? "Cº" : "Fº" }</p>
                    <button onClick={convertCelsius}>
                        {isDt ? "Convert to Fahrenheit" :"Convert to Centigrade"}
                    </button>
                </div>
            </div>
            <hr />
            <p><i className="fa-solid fa-wind"></i><b> Wind speed: </b> {weather.wind?.speed} m/s</p>
            <p><i className="fa-solid fa-cloud"></i><b> Clouds: </b>{weather.main?.humidity} %</p>
            <p><i className="fa-solid fa-temperature-full"></i><b> Pressure: </b> {weather.main?.pressure} hPa</p>
        </div>
    );
};



export default ConsumingApi;