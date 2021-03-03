import React, {useState} from "react";

// @ts-ignore
import sha256 from 'crypto-js/sha256';

import "./settings.scss";
import {FetchResponse} from "../../../Utils/Interfaces";
import {InternalAPI} from "../../../Utils/Api";
import Loading from "../../Blocks/Loading/Loading";

interface CheckPassData {
    ok:boolean,
    status:number
}

const Settings = () => {
    const [oldPass, changeOldPass] = useState<string>("");
    const [newPass, changeNewPass] = useState<string>("");
    const [passConfirm, changePassConfirm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const checkPassConditions = async () => {
        if (newPass !== passConfirm) return {status: 503, ok: false} as CheckPassData;
        if (newPass.length === 0 || passConfirm.length === 0) return {status: 402, ok: false} as CheckPassData;

        const promise:CheckPassData = await new Promise<FetchResponse>(async (resolve, reject) => {
            const request:FetchResponse = await InternalAPI.users.checkUserPass({
                password: sha256(oldPass).toString(),
            });

            if (request.ok) {
                resolve(request);
            } else {
                reject(request);
            }
        }).then((res:FetchResponse) => {
            return {ok: !0, status:res.data.status} as CheckPassData;
        }).catch((res:FetchResponse) => {
            return {ok: !1, status:res.data.status} as CheckPassData;
        });

        if (promise.status === 400) return {status: 400, ok: false} as CheckPassData;

        console.log(promise);
        return {status: promise.status, ok: promise.ok} as CheckPassData;
    }

    const sendNewPassData = () => {
        new Promise<FetchResponse>(async (resolve, reject) => {
            const request:FetchResponse = await InternalAPI.users.updateUserPass({password: sha256(newPass).toString()});

            if (request.ok) {
                resolve(request);
            } else {
                reject(request);
            }
        }).then((res:FetchResponse) => {
            alert("Password successfully updated!");
        }).catch((err:FetchResponse) => {
            handlePassError(err.data.status);
        });
    }

    const handlePassError = (status:number) => {
        let error:string;

        switch (status) {
            case 500:
                error = "Internal server error.";
                break;
            case 400:
                error = "Old password is wrong.";
                break;
            case 503:
                error = "New passwords doesn't match.";
                break;
            case 402:
                error = "You need to fill all fields.";
                break;
            case 403:
                error = "Session expired.";
                break;
            default:
                error = "Something went wrong.";
                break;
        }
        alert(error);
    }

    const sendNewPassword = async () => {
        const availability:any = await checkPassConditions();
        console.log(availability);

        if (availability.ok) {
            sendNewPassData();
        } else {
            handlePassError(availability.status);
        }
    }

    return(
        <section className="settings">

            {loading && <Loading/>}
            <h2 className="page-title settings__title">Settings</h2>
            <div className="settings__option">
                <h3 className="settings__title_small">
                    Password
                </h3>

                <input
                    type="password"
                    className="input-text settings__input-text"
                    placeholder="Old password"
                    onChange={(e) => changeOldPass(e.target.value)}
                />
                <input
                    type="password"
                    className="input-text settings__input-text"
                    placeholder="New password"
                    onChange={(e) => changeNewPass(e.target.value)}
                />
                
                <input
                    id="settings__new-password_again"
                    type="password"
                    className="input-text settings__input-text"
                    placeholder="New password again"
                    onChange={(e) => changePassConfirm(e.target.value)}
                />

                <button className="btn settings__button" onClick={sendNewPassword}>Save</button>
            </div>

        </section>
    )
}

export default Settings;