import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteAccountConfirmationModal from "../component/DeleteAccountConfirmationModal.js";
import Navbar from "../component/NavBar.js";
import GeneralConst from "../resource/General.js";
import UrlConst from "../resource/Url.js";
import axios from "axios";
import "../style.css";

const Profile = () =>{
  const [city, setCity] = useState("");
  const [form, setForm] = useState({
    username:"",
    email:""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdated, setIsLoadingUpdated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    getProfile()
  }, []);

  const getProfile = async () => {
    setIsLoading(true);
    
    axios({
      method: 'get',
      url: UrlConst.GETPROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsLoading(false);

      setCity(res.data.Setting.city)
      setForm({
        username: res.data.User.username,
        email: res.data.User.email
      })
    })    
    .catch((err) => {
      setIsLoading(false);
    })
  };

  const onSubmit = () => {
    setIsLoadingUpdated(true);

    axios({
      method: 'post',
      url: UrlConst.GETPROFILE,
      data: {
        username:form.username,
        email:form.email
      },
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setIsLoadingUpdated(false);

      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 3000);
    })    
    .catch((err) => {
      setIsLoadingUpdated(false);
    })
  };

  const updateForm = (e) =>{
    setForm(previousState =>{
      return { 
        ...previousState,
        [e.target.name]:e.target.value
      }
    });
  }

  const modalDeleteHandler = () => {
    setIsShowModalDelete(true)
  }

  return(
    <>
      <Navbar
        activeNavBar={GeneralConst.PROFILE}
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
            <div className="title-profile">{GeneralConst.PROFILE}</div>
            <div className="profile-wrapper">
              {isUpdated && (
                <div className="setting-saved-message">
                  {GeneralConst.PROFILE_SAVED_MESSAGE}
                </div>
              )}
              <label htmlFor="title">{GeneralConst.USERNAME}</label><br />
              <input 
                type="input"
                defaultValue={form.username}
                name="username"
                onChange={
                  (e) => {updateForm(e)}
                }
              /><br />
              <label htmlFor="title">{GeneralConst.EMAIL}</label><br />
              <input
                type="email"
                name="email"
                defaultValue={form.email}
                onChange={
                  (e) => {updateForm(e)}
                }
              /><br />
              <label htmlFor="title">{GeneralConst.INPUT_CITY_TITLE}</label><br />
              <input
                className="input-profile-disable"
                type="input"
                value={city}
                disabled={true}
              />
              <span>{GeneralConst.PROFILE_UPDATE_CITY}</span>
              <br />
              {isLoadingUpdated && (
                <div className="dashboard-wait-container">
                  <div>
                    {GeneralConst.PROFILE_SAVE_WAIT_MESSAGE}
                  </div>
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
                  </div>            
                </div>
              )}
              {isLoadingUpdated === false && (
                <>
                  <div>
                    <button
                      className="btn-profile"
                      onClick={onSubmit}
                    >
                      {GeneralConst.BTN_UPDATE}
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn-profile"
                      onClick={modalDeleteHandler}
                    >
                      {GeneralConst.BTN_DELETE}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      {isShowModalDelete && (
        <DeleteAccountConfirmationModal
          username={form.username}
          setIsShowModalDelete = {setIsShowModalDelete}
        />
      )}
    </>
  )
}

export default Profile