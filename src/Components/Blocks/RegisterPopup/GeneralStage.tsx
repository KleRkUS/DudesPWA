import React, {useRef, useState} from "react";

interface GeneralStage {
    proceed:(username:string, email:string) => number,
    defaultUsername:string,
    defaultEmail:string
}

const GeneralStage = ({proceed, defaultUsername, defaultEmail}:GeneralStage) => {
    const [username, setUsername] = useState<string>(defaultUsername);
    const [email, setEmail] = useState<string>(defaultEmail);
    const [error, setError] = useState<string>("");

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const isDataValid = ():boolean => {
        switch (username.length) {
            case 0:
                usernameRef.current!.classList.add("input-text_error");
                return false;
            default:
                usernameRef.current!.classList.remove("input-text_error");
                break;
        }

        switch (email.length) {
            case 0:
                emailRef.current!.classList.add("input-text_error");
                return false;
            default:
                emailRef.current!.classList.remove("input-text_error");
                break;
        }
        return true;
    }

    const confirm = ():boolean | void => {
        if (!isDataValid()) return false;

        const res:number = proceed(username, email);

        if (res === 0) {
            setError("Username or email is undefined");
        } else if (res === -1) {
            setError("Email is invalid");
        } else {
            setError("")
        }
    }

    return(
        <div className="vertical-form">
            {/*<label htmlFor="reg-username" className="label popup__label">Username</label>*/}
            <input
                type="text"
                placeholder="Username"
                id="reg-username"
                value={username}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                className="popup__input-text input-text"
                ref={usernameRef}
            />

            {/*<label htmlFor="reg-email" className="label popup__label">E-mail</label>*/}
            <input
                type="text"
                placeholder="E-mail"
                id="reg-email"
                value={email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="popup__input-text input-text"
                ref={emailRef}
            />

            <button className="btn popup__button" onClick={confirm}>Proceed</button>
            {error.length > 0 && <span className="popup__error">{error}</span>}
        </div>
    );
}

export default GeneralStage;