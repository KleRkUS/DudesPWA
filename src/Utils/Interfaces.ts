interface ProductInterface {
    id:number,
    name:string,
    priority: 'High' | "Medium" | "Low",
    user:string,
    time:number,
    status?:boolean
}

interface FetchResponse {
    ok:boolean,
    data:any,
    cached?:boolean
}

type Popup = new (onClose:object, ...args:any[]) => {};

export {ProductInterface, FetchResponse, Popup};