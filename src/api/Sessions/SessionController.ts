const axiosSender = require('../AxiosSender');

const baseUrl:string = "http://localhost:8000/api";

exports.authentificate = async (req:any, res:any) => {
    const request = {
        authorization: req.cookies.JWT,
        method: "GET",
        url: `${baseUrl}/check_auth`
    }

    await axiosSender.send(request, req, res);
}

exports.login = async (req:any, res:any) => {
    const request = {
        data: req.body,
        method: "POST",
        url: `${baseUrl}/login`
    };

    await axiosSender.send(request, req, res);
}
