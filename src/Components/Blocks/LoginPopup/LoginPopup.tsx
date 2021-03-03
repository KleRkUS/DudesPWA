import React, {useRef, useState} from "react";
import {authentificateUser} from "../../../Utils/SessionController";
import {Dudes} from "../../../Core/dudes";

const LoginPopup = ({render, onClose}:Dudes.ChildrenPopupProps) => {
    const [login, changeLogin] = useState<string>("");
    const [password, changePassword] = useState<string>("");
    const loginRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLInputElement>(null);

    const onLogin = async () => {

        if (login.length === 0) {
            loginRef.current!.classList.add("input-text_error");
        } else if (password.length === 0) {
            passRef.current!.classList.add("input-text_error");
        } else {
            loginRef.current!.classList.remove("input-text_error");
            passRef.current!.classList.remove("input-text_error");

            const loginState = await authentificateUser(login, password);

            if (!loginState.ok) {
                // @ts-ignore
                errorRef.current.innerText = "Something went wrong!";
            } else {
                location.replace("/");
            }
        }
    }

    const content =
        <div className="flex-between-center popup__content">
            <input type="text" className="popup__input-text input-text" placeholder="Login" onChange={e => changeLogin(e.target.value)} ref={loginRef}/>
            <input type="password" className="popup__input-text input-text" placeholder="Password" onChange={e => changePassword(e.target.value)} ref={passRef}/>
            <button className="btn popup__button" onClick={onLogin}>login</button>
        </div>;

    return render(content);
}

export default LoginPopup;