// @ts-ignore
import sha256 from 'crypto-js/sha256';

import {FetchResponse} from "./Interfaces";
import {InternalAPI} from "./Api";


const checkAuthentification = (): Promise<string> => {

    return new Promise<string>(async (resolve) => {
        const res:FetchResponse = await InternalAPI.session.checkAuth();
        if (res.ok) {
            resolve("Authorized");
        } else {
            resolve("Unauthorized");
        }
    }).then((res:string) => {
        return res;
    });

}

const authentificateUser = (name:string, password:string):Promise<FetchResponse> => {

    return new Promise<FetchResponse>(async (resolve) =>{
        const hashedPass = sha256(password).toString();
        let res:FetchResponse = await InternalAPI.session.login(name, hashedPass);

        resolve (res);
    }).then((res:FetchResponse) => {
        return res;
    });

}


export {checkAuthentification, authentificateUser};