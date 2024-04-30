import Navbar from "../component/NavBar.js";
import GeneralConst from "../resource/General.js";
import axios from "axios";
import UrlConst from "../resource/Url.js";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../style.css";

const Setting = () =>{
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTemperatureUnit, setSelectedTemperatureUnit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    setIsLoading(true);

    updateSettingHandler();
  }, []);

  useEffect(() => {
    updateSettingHandler();
  }, [isLoadingSave]);

  const InputCity = () => {
    return(
      <div>
        <label htmlFor="title">{GeneralConst.INPUT_CITY_TITLE}</label><br />
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
        >
          <option value="BANDUNG">Bandung</option>
          <option value="JAKARTA">Jakarta</option>
          <option value="LONDON">London</option>
          <option value="LOS_ANGELES">Los Angeles</option>
          <option value="PERUGIA">Perugia</option>
          <option value="ROME">Rome</option>
          <option value="SURABAYA">Surabaya</option>
        </select>
      </div>
    )
  }

  const InputTemperatureUnit = () => {
    return(
      <div className="temperature-input-wrapper">
        <label htmlFor="title">{GeneralConst.INPUT_TEMPERATURE_TITLE}</label><br />
        <select
          value={selectedTemperatureUnit}
          onChange={e => setSelectedTemperatureUnit(e.target.value)}
        >
          <option value="CELCIUS">&deg; C Celcius</option>
          <option value="FAHRENHEIT">&deg; F Fahrenheit</option>
        </select>
      </div>
    )
  }

  const submitData = async() => {
    setIsLoadingSave(true);

    axios({
      method: 'post',
      url: UrlConst.GETSETTING,
      data: {
        city: selectedCity,
        unit: selectedTemperatureUnit
      },
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsSaved(true);
      setIsLoadingSave(false);

      setTimeout(() => setIsSaved(false), 3000);
    })    
    .catch((err) => {
      setIsLoadingSave(false);
    });
  }

  const updateSettingHandler = () => {
    axios({
      method: 'get',
      url: UrlConst.GETSETTING,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsLoading(false);

      setSelectedCity(res.data.city);
      setSelectedTemperatureUnit(res.data.unit);
    })    
    .catch((err) => {
      setIsLoading(false);
    })
  }

  return(
    <>    
      <Navbar
        activeNavBar={GeneralConst.SETTINGS}
      />
      <div>
        {isLoading && (
          <div className="dashboard-wait-container">
            <div>
              {GeneralConst.WAIT_MESSAGE}
            </div>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
            </div>            
          </div>
        )}
        {isLoading === false && (
          <>
            <div className="title-setting">{GeneralConst.SETTINGS}</div>
            <div className="setting-container">
              {isSaved && (
                <div className="setting-saved-message">
                  {GeneralConst.SETTING_SAVED_MESSAGE}
                </div>
              )}
              <InputCity />
              <InputTemperatureUnit />
              {isLoadingSave && (
                <div className="dashboard-wait-container">
                  <div>
                    {GeneralConst.SETTING_SAVE_WAIT_MESSAGE}
                  </div>
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
                  </div>            
                </div>
              )}
              {isLoadingSave === false && (
                <button
                  className="btn-save-setting"
                    onClick={() => submitData()}
                  >
                    {GeneralConst.INPUT_SAVE}
                </button>
              )}
            </div>
          </>
        )}
      </div>      
    </>
  )
}

export default Setting