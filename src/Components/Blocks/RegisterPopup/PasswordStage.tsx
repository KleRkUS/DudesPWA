import React, {useState} from "react";

interface PasswordStage {
    proceed:(password:string) => void,
    stageBack:() => void,
    defaultPassword:string
}

const PasswordStage = ({proceed, stageBack, defaultPassword}:PasswordStage) => {
    const [password, setPassword] = useState<string>(defaultPassword);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const isPassesValid = () => {
        return (password === confirmPassword && password.length >= 6);
    }

    const confirm = ():void => {
        if (!isPassesValid()) {
            setError("Passwords must be at least 6 symbols and match each other!");
            return;
        }

        proceed(password);
    }

    return(
        <div className="vertical-form">
            <input
                type="password"
                placeholder="Password"
                id="reg-password"
                value={password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="popup__input-text input-text"
            />

            <input
                type="password"
                placeholder="Confirm password"
                id="reg-confirm-password"
                value={confirmPassword}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                className="popup__input-text input-text"
            />

            <div className="popup__buttons-container">
                <button className="btn btn_optional popup__button popup__button_contained" onClick={stageBack}>Return</button>
                <button className="btn popup__button popup__button_contained" onClick={confirm}>Proceed</button>
            </div>
            {error.length > 0 && <span className="popup__error">{error}</span>}
        </div>
    );
}

export default PasswordStage;