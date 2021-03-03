import {Dudes} from "../../../Core/dudes";
import React, {useState} from "react";
import GeneralStage from "./GeneralStage";
import {isEmailValid} from "../../../Utils/Verificator";
import PasswordStage from "./PasswordStage";
import ConfirmStage from "./ConfirmStage";

interface UserData {
    username:string,
    email:string,
    password:string
}

const RegisterPopup = ({render, onClose}:Dudes.ChildrenPopupProps) => {
    const [stage, setStage] = useState<number>(0);
    const [userData, setUserData] = useState<UserData>({
       username: "",
       email: "",
       password: "",
    });

    const changeStage = (delta:number):void => {
        const newStage = stage + delta;
        if (newStage < 3 && newStage >= 0) setStage(newStage);
    }

    const proceedGeneralStage = (username:string, email:string):number => {
        if (!username || !email) return 0;
        if (!isEmailValid(email)) return -1;

        const updatedUserData:UserData = {...userData};
        updatedUserData.email = email;
        updatedUserData.username = username;

        setUserData(updatedUserData);
        changeStage(1);
        return 1;
    }

    const proceedPasswordStage = (password:string):void => {
        const updatedUserData:UserData = {...userData};
        updatedUserData.password = password;
        setUserData(updatedUserData);
        changeStage(1);
    }

    const confirmRegistration = ():void => {

    }

    const content = <div className="popup__content">

        {stage === 0 &&
            <GeneralStage
              proceed={proceedGeneralStage}
              defaultUsername={userData.username}
              defaultEmail={userData.email}
            />
        }

        {stage === 1 &&
            <PasswordStage
                proceed={proceedPasswordStage}
                stageBack={() => changeStage(-1)}
                defaultPassword={userData.password}
            />
        }

        {stage === 2 &&
            <ConfirmStage
                username={userData.username}
                email={userData.email}
                passLength={userData.password.length}
                proceed={confirmRegistration}
                stageBack={() => changeStage(-1)}
            />
        }

    </div>;

    return render(content);
}

export default RegisterPopup;