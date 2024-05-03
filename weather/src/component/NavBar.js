import { Link } from "react-router-dom";
import { AuthContext } from "../App.js";
import { useContext } from "react";
import { useCookies } from 'react-cookie';
import GeneralConst from "../resource/General.js"
import "../style.css";

function Navbar({activeNavBar}) {
  const context = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(['user']);

  return(
    <div className="container-navbar">
      <div>
        <Link to="/">
          <button 
            className={activeNavBar === GeneralConst.DASHBOARD ? "btn btn-active" : "btn btn-deactive"}
          >
            {GeneralConst.DASHBOARD}
          </button>
        </Link>
      </div>
        <Link to="/settings">
          <button 
            className={activeNavBar === GeneralConst.SETTINGS ? "btn btn-active" : "btn btn-deactive"}
          >
            {GeneralConst.SETTINGS}
          </button>
        </Link>
      <div>
        <Link to="/profile">
          <button 
            className={activeNavBar === GeneralConst.PROFILE ? "btn btn-active" : "btn btn-deactive"}
          >
            {GeneralConst.PROFILE}
          </button>
        </Link>
      </div>
      <div>
        {cookies['token'] !== undefined && (
          <button
            className="btn btn-deactive"
            onClick={()=>context.handleLogout(cookies['token'])}
          >
            {GeneralConst.LOGOUT}
          </button>
        )}
      </div>
    </div>
  )
};

export default Navbar;