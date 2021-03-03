import {FetchResponse, ProductInterface} from "./Interfaces";

const fetchData = async (url: string, options: object = {}): Promise<FetchResponse> => {
    return await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res: any) => {
        if (res.ok) {
            return {
                ok: true,
                data: await res.json(),
                cached: false
            } as FetchResponse;
        } else {
            throw res;
        }
    }).catch((err: any) => {
        return {
            ok: false,
            data: err,
            cached: false
        } as FetchResponse
    });
}

export namespace InternalAPI {
    const baseUrl:string = "http://localhost:8000/api";

    export class session {
        public static checkAuth = async () => {
            const url = `/api/session`;
            return await fetchData(url, {method: "GET"}) as FetchResponse;
        };

        public static login = async (name: string, password: string) => {
            const url = `/api/session`;
            return await fetchData(url, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            }) as FetchResponse;
        }

        public static logout = async () => {
            const url = `${baseUrl}/logout`;
            return await fetchData(url, {
                method: "POST"
            }) as FetchResponse;
        }
    }

    export class products {
        private static readonly internalUrl:string = `${baseUrl}/products`;

        public static getGoods = async () => {
            const url = products.internalUrl;
            return await fetchData(url, {
                method: "GET"
            }) as FetchResponse;
        };

        public static addGood = async (product: ProductInterface) => {
            const url = products.internalUrl;
            return await fetchData(url, {
                method: "POST",
                body: JSON.stringify(product)
            }) as FetchResponse;
        };

        public static removeGood = async (id: number) => {
            const url = `${products.internalUrl}/${id}`;
            return await fetchData(url, {
                method: "DELETE"
            }) as FetchResponse;
        };

        public static changeGoodStatus = async (status: boolean, id: number) => {
            const url = `${products.internalUrl}/${id}`;
            return await fetchData(url, {
                method: "PATCH",
                body: JSON.stringify({status: status})
            }) as FetchResponse;
        }
    }

    export class users {
        public static getAllUsers = async () => {
            const url = `${baseUrl}/users`;
            return await fetchData(url, {
                method: "GET"
            }) as FetchResponse;
        };

        public static checkUserPass = async (reqs: object) => {
            const url = `${baseUrl}/settings/checkPass`;
            return await fetchData(url, {
                method: "POST",
                body: JSON.stringify(reqs)
            }) as FetchResponse;
        };

        public static updateUserPass = async (reqs: object) => {
            const url = `${baseUrl}/settings`;
            return await fetchData(url, {
                method: "POST",
                body: JSON.stringify(reqs)
            }) as FetchResponse;
        };

        public static createNewUser = async (reqs: object) => {
            const url = `/api/registration`;
            return await fetchData(url, {
                method: "POST",
                body: JSON.stringify(reqs)
            })
        }
    }
}