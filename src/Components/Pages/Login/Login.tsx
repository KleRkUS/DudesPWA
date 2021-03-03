import React, {useRef, useState} from 'react';
import "./login.scss";
import Popup from "../../Blocks/Popup/Popup";
import LoginPopup from "../../Blocks/LoginPopup/LoginPopup";
import RegisterPopup from "../../Blocks/RegisterPopup/RegisterPopup";

const Login = () => {
    const [authState, setAuthState] = useState<string>("");

    return(
        <main className="container_full-page flex-between-center">
            <div className="login-page__container">
                <h1 className="login-page__title">Login</h1>

                <button className="btn login-page__button" onClick={() => setAuthState("login")}>Sign in</button>
                <button className="btn btn_optional login-page__button"  onClick={() => setAuthState("registration")}>Sign up</button>
            </div>

            {authState === "login" &&
                <Popup onClose={() => setAuthState("")} implementation={LoginPopup} title={"Sign in"}/>
            }
            {authState === "registration" &&
                <Popup onClose={() => setAuthState("")} implementation={RegisterPopup} title={"Sign up"}/>
            }
        </main>
    );
}

export default Login;