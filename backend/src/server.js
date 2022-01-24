import express from "express";
require('dotenv').config();
var morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(cors());


const port = process.env.PORT || 3000;
const routes = require('./route');

app.use(morgan('combined'));
//public file
app.use(express.static('./src/public'));
app.use(cookieParser());


//body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})