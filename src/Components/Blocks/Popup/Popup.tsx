import React, {FunctionComponent} from "react";

import "../Popup/popup.scss";

interface PopupProps {
    onClose:() => void,
    implementation:any,
    title:string
}

const Popup = ({onClose, implementation, title}:PopupProps) => {
    const closePopup = () => {
        onClose();
    }

    const render = (content:JSX.Element) => {
        return (
            <div className="container_full-page popup__wrapper flex-center">
                <div className="popup">

                    <button className="popup__close" onClick={() => onClose()}>&#10005;</button>
                    <h2 className="popup__title">{title}</h2>

                    {content}

                </div>
            </div>
        )
    }

    return implementation({render, closePopup});
}

export default Popup;