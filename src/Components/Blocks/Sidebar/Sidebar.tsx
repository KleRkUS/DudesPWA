import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./sidebar.scss";
import {getSidebarState, sidebarCollapsed} from "./SidebarSlice";

const Sidebar = () => {
    const sidebarState = useSelector(getSidebarState);
    const dispatch = useDispatch();

    const collapseSidebar = () => {
        dispatch(sidebarCollapsed());
    }

    return (
        <aside className={`sidebar ${sidebarState ? "sidebar_shown" : ""}`}>
            <button className="sidebar__button" onClick={collapseSidebar}>&#10005;</button>

            <ul className="sidebar__nav">
                <li className="sidebar__elem">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="sidebar__elem">
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;