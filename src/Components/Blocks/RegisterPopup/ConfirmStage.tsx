import React from "react";
import "./confirm-stage.scss";


interface ConfirmStage {
    username:string,
    email:string,
    passLength:number,
    stageBack: () => void,
    proceed: () => void
}

const ConfirmStage = ({username, email, passLength, stageBack, proceed}:ConfirmStage) => {
    return(
        <div className="vertical-form confirm-stage">
            <span className="confirm-stage__subtitle">Check your data before continue!</span>
            <ul className="confirm-stage__list">
                <li>
                    Username: <i>{username}</i>
                </li>
                <li>
                    Email: <i>{email}</i>
                </li>
                <li>
                    Password length: <i>{passLength} characters</i>
                </li>
            </ul>

            <div className="popup__buttons-container">
                <button className="btn btn_optional popup__button popup__button_contained" onClick={stageBack}>Return</button>
                <button className="btn popup__button popup__button_contained" onClick={proceed}>Proceed</button>
            </div>
        </div>
    );
}

export default ConfirmStage;