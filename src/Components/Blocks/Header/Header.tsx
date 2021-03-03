import React from 'react';
import Routes from "../../../Utils/Routes";
import {useDispatch} from "react-redux";

import "./Header.scss";
import {InternalAPI} from "../../../Utils/Api";
import {FetchResponse} from "../../../Utils/Interfaces";
import {sidebarExpanded} from "../Sidebar/SidebarSlice";

const Header = (props:any) => {
    const title:string = Routes[props.location.pathname];
    const dispatch = useDispatch();

    const logoutUser = async () => {
        const logoutStatus:FetchResponse = await InternalAPI.session.logout();
        if (logoutStatus.ok) {
            location.replace("/");
        }
    }

    const expandSidebar = () => {
        dispatch(sidebarExpanded());
    }

    return (
        <header className="flex-between-center main-header">
            <div className="flex-between-center">
                <button className="main-header__burger main-header__button" onClick={expandSidebar}>
                    <hr/>
                    <hr/>
                    <hr/>
                </button>
                <h1>{title}</h1>
            </div>
            <button className="btn main-header__login" onClick={logoutUser}>Logout</button>
        </header>
    );
}

export default Header;