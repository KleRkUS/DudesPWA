import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Provider, useSelector} from 'react-redux';
import store from "./store";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {useDispatch} from 'react-redux'

import {checkAuthentification} from "./Utils/SessionController";
import {getAuthState} from "./AuthSlice";
import {userSignedOut, userSingedIn} from "./AuthSlice";

import "./Components/_common.scss";

import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Header from "./Components/Blocks/Header/Header";
import Login from "./Components/Pages/Login/Login";
import Loading from "./Components/Blocks/Loading/Loading";
import Sidebar from "./Components/Blocks/Sidebar/Sidebar";
import Settings from "./Components/Pages/Settings/Settings";


const App = (props: any) => {
    const [authStatus, setAuthStatus] = useState<string>(useSelector(getAuthState));
    const dispatch = useDispatch();

    useEffect(() => {

        if (authStatus === "Unknown") {
            new Promise<string>( async (resolve, reject) => {
                const newAuthStatus:string = await checkAuthentification();

                if (newAuthStatus === "Authorized" ) {
                    resolve(newAuthStatus);
                } else if (newAuthStatus === "Unauthorized") {
                    reject(newAuthStatus)
                }
            }).then(res => {
                dispatch(userSingedIn());
                setAuthStatus(res);
            }).catch(err => {
                dispatch(userSignedOut());
                setAuthStatus(err);
            });
        }

    }, []);

    if (authStatus === "Unknown") return <Loading/>
    if (authStatus === "Unauthorized") return <Login/>
    // @ts-ignore
    return(
        <div>
            <BrowserRouter>

                <Header {...props} />
                <Sidebar/>

                <Switch>
                    <Route path="/dashboard" render={props => (
                        // @ts-ignore
                        <Dashboard />
                    )}/>
                    <Route path="/settings" render={props => (
                        // @ts-ignore
                        <Settings />
                    )}/>
                    <Route exact path="/" render={props => (
                        <Redirect to="/dashboard" />
                    )}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route path="/" render={props => (
                <App {...props}/>
            )}/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)

if (!(`serviceWorker` in navigator)) {
    console.log(`Service Worker not supported`);
} else {
    console.log(`Service worker registered`);
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
            console.log(`SW registered. Scope: ${reg.scope}`);
            reg.update();
        })
        .catch((err) => {
            console.log(`Error when registering SW: ${err}`)
        })
}