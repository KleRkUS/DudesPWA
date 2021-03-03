const axios = require('axios');

exports.send = (reqs:object, req:any, res:any):void => {

    const params:object = {
        ...reqs,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://localhost:5000",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE"
        }
    }

    axios(params).then(async (response:any) => {

        const body:object = await response.data();
        res.status(response.status).json({message:body});
    }).catch((err:any) => {
        res.status(err.response!.status).json({message:err.toJSON()})
    });
}
