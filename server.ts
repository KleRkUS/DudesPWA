const path = require('path');
const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const https = require('https');
const fs = require('fs');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiRoutes = require("./src/api/routes");

const options = {
    key: fs.readFileSync('private/key.pem'),
    cert: fs.readFileSync('private/cert.pem')
};

const corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/api', apiRoutes);

app.get('*', (req:Request,res:any) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

https.createServer(options, app).listen(port, () => {console.log(`Server running on port ${port}`)});