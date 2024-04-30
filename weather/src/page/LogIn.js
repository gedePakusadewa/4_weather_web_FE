import { AuthContext } from "../App.js";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GeneralConst from "../resource/General.js"
import "../style.css";

const LogIn = () =>{
  const context = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(['user']);
  const [isShowSignUpButton, setIsShowSignUpButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() =>{
    if (cookies['token'] !== undefined){
      navigate(`/dashboard`);
      return () => {};
    }
  }, [])

  const [form, setForm] = useState({
    username:"",
    password:""
  });

  const updateForm = (e)  =>{
    setForm(previousState =>{
      return { 
        ...previousState,
        [e.target.name]:e.target.value
      }
    });
  }

  return(
    <div className="login-container">
      <div className="login-wrapper">
        <div>
          <div className="title-login">{GeneralConst.LOGIN_TITLE}</div>
          {context.isErrorInput && (
            <p className="wrong-username-password">{GeneralConst.WRONG_INPUT_LOGIN}</p>
          )}
          <label htmlFor="username">{GeneralConst.USERNAME}</label><br />
          <input 
            type="text"
            name="username"
            onChange={(e)=>{updateForm(e)}}
          /><br />
          <label htmlFor="password">{GeneralConst.PASSWORD}</label><br />
          <input 
            type="password"
            name="password"
            onChange={(e)=>{updateForm(e)}}
          /><br />
          {context.isShowLogInButtons && (
            <button
              className="btn btn-login" 
              onClick={()=>context.handleLogin(form.username, form.password)}
            >
              {GeneralConst.LOGIN}
            </button>
          )}
          {(isShowSignUpButton && context.isShowLogInButtons === true) && (
            <button
              className="btn btn-signup" 
              onClick={()=>context.handleSignUp()}
            >
              {GeneralConst.SIGNUP}
            </button>
          )}
          {(isShowSignUpButton === false  && context.isShowLogInButtons === true) && (
            <button
              className="btn btn-signup"
              onClick={()=>context.handleDemoLogin()}
            >
              {GeneralConst.LOGIN_AS_GUEST}
            </button>
          )}
          {context.isShowLogInButtons === false && (
            <>
              <div className="login-wait-message">
                {GeneralConst.LOGIN_WAIT_MESSAGE}
              </div>
              <div className="login-wait-message-icon">
                <FontAwesomeIcon icon="fa-solid fa-spinner" spinPulse />
              </div>            
            </>
          )}
        </div>
      </div>
    </div>
  )
}
  
export default LogIn