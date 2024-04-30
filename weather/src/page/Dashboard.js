import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  GetIconWeather,
  GetIconAirCondition,
  GetIconTodayWeather,
  GetIconNextDaysWeather
} from '../helper/GetIconWeather.js';
import AirConditionConst from "../resource/AirCondition.js";
import UrlConst from "../resource/Url.js";
import axios from "axios";
import Navbar from "../component/NavBar.js";
import GeneralConst from "../resource/General.js";
import "../style.css";

const Dashboard = () => {
  const [cookies, setCookie] = useCookies(['user']);

  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [uvIndex, setUvIndex] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [todayForecast, setTodayForecast] = useState(null);
  const [current6hourForecast, setCurrent6hourForecast] = useState(null);
  const [currentLocalTime, setCurrentLocalTime] = useState("");
  const [next7DaysForecast, setNext7DaysForecast] = useState(null);
  const [currentNext7DaysForecast, setCurrentNext7DaysForecast] = useState(null);
  const [iconURL, setIconURL] = useState(null);
  const [unitDegree, setUnitDegree] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getWeatherData()
  }, []);

  useEffect(() => {
    setCurrent6hourForecast(getCurrentForecast(currentLocalTime, todayForecast))

    setCurrentNext7DaysForecast(getNextDaysForecast(currentLocalTime, next7DaysForecast))

  }, [todayForecast]);
  
  const getWeatherData = async (location) => {
    setIsLoading(true);

    axios({
      method: 'get',
      url: UrlConst.GETWEATHER,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsLoading(false);  

      setCity(res.data.location.name)
      setRegion(res.data.location.region)
      setCountry(res.data.location.country)
      setCondition(res.data.current.condition.text)
      setUvIndex(res.data.current.uv)
      setWindSpeed(res.data.current.wind_kph)
      setHumidity(res.data.current.humidity)
      setTodayForecast(res.data.forecast.forecastday[0].hour)
      setCurrentLocalTime(res.data.location.localtime)
      setNext7DaysForecast(res.data.forecast.forecastday)
      setIconURL(res.data.current.condition.icon)
      setUnitDegree(res.data.unit_degree)

      if(res.data.unit_degree === GeneralConst.UNIT_CELCIUS){
        setTemp(res.data.current.temp_c)
      }else if (res.data.unit_degree === GeneralConst.UNIT_FAHRENHEIT){
        setTemp(res.data.current.temp_f)
      }
    })      
    .catch((err) => {
      setIsLoading(false);
    })
  };
  
  // get 6 hour ahead
  const getCurrentForecast = (currentLocalTime, hour24Data) => {
    if(hour24Data !== null){
      const temp = [];
      let currentLocalTimeHour = 
        currentLocalTime.slice(11, 13).replace(":", "");
      let tempHour = parseInt(currentLocalTimeHour) + 7;
      let incre = 0;

      hour24Data.map((data, idx) => {
        if (idx >= currentLocalTimeHour && idx < tempHour){
          data.hour = idx
          temp[incre] = data
          incre++
        }
      })

      return temp
    }

    return null
  }

  // geyt 7 days ahead in exact time when get api
  const getNextDaysForecast = (currentLocalTime, nextDaysData) => {
    if(nextDaysData !== null){
      const temp = [];
      let currentLocalTimeHour = 
        parseInt(currentLocalTime.slice(11, 13).replace(":", ""));
      let currentDate = new Date(currentLocalTime.slice(0, 11))
      let incre = 0;

      nextDaysData.map((data, idx) => {
        let tempNextDate = new Date(data.date)
        if(tempNextDate.setHours(0,0,0,0) > currentDate.setHours(0,0,0,0)){
          data.hour.map((item, idx2) => {
            if(idx2 === currentLocalTimeHour){
              item.hour = idx2
              
              temp[incre] = item
              incre++
            }
          })
        }
      })

      return temp
    }

    return null
  }

  function getTemperatureUnit(unitDegree){
    if(unitDegree === GeneralConst.UNIT_CELCIUS){
      return(<>&deg;C</>)
    }else if (unitDegree === GeneralConst.UNIT_FAHRENHEIT){
      return(<>&deg;F</>)
    }
  }

  return(
    <>
      <Navbar
        activeNavBar={GeneralConst.DASHBOARD}
      />
      <div className="main-container">
        {isLoading && (
          <div className="dashboard-wait-container">
            <div>
              {GeneralConst.DASHBOARD_WAIT_MESSAGE}
            </div>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
            </div>            
          </div>
        )}
        {isLoading === false && (
          <>
            <div className="today-container">
              <div className="curr-weather-container">
                <div className="main-city-wrapper">
                  <div>
                    <div className="main-city-title">{city}</div>
                    <div className="main-region-title">{region} region</div>
                    <div className="main-country-title">{country}</div>
                  </div>
                  <div>{temp} {getTemperatureUnit(unitDegree)}</div>
                </div>
                <div>
                  <GetIconWeather
                    condition={condition}
                    iconURL={iconURL}
                  />
                </div>
              </div>
              <div className="today-forecast-wrapper">
                <div className="today-forecast-title">{GeneralConst.TODAY_FORECAST}</div>
                <div className="wrap-content-today-forecast">
                  {current6hourForecast !== null && (current6hourForecast.map(data => {
                      return(
                        <GetIconTodayWeather 
                          hour={data.hour}
                          iconURL={data.condition.icon}
                          valueCelcius={data.temp_c}
                          valueFahrenheit={data.temp_f}
                          unitDegree={unitDegree}
                          unitDegreeText={getTemperatureUnit(unitDegree)}
                        />
                      )      
                    })
                  )}
                </div>
              </div>
              <div className="air-conditions-wrapper">
                <div className="air-condition-title">{GeneralConst.AIR_CONDITIONS}</div>
                <div className="air-conditions-detail-wrapper">
                  <div className="air-conditions-uv-and-wind">
                    <GetIconAirCondition
                      condition={AirConditionConst.UV_INDEX}
                      value={uvIndex}
                    />
                    <GetIconAirCondition
                      condition={AirConditionConst.WIND_SPEED}
                      value={windSpeed}
                    />
                  </div>
                  <div className="air-conditions-humidity">
                    <GetIconAirCondition
                      condition={AirConditionConst.HUMIDITY}
                      value={humidity}
                    />
                  </div>
                </div>          
              </div>
            </div>
            <div className="forecast-container">
              <div>
                <div className="forecast-title">{GeneralConst.NEXT_7_DAY_FORECAST}</div>
                <div className="forecast-card-container">
                  <GetIconNextDaysWeather 
                    data={currentNext7DaysForecast}
                    unitDegree={unitDegree}
                    unitDegreeText={getTemperatureUnit(unitDegree)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  )
}

export default Dashboard