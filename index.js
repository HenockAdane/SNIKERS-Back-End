const express = require('express');
const app = express();
const port = 3000;


const bodyParser = require("body-parser")
//get the body parser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// allows to process data from the url and json


const cors = require("cors")
app.use(cors())

const bcrypt = require("bcrypt")



const mongoose = require("mongoose")
const password = process.env.PASSWORD
const dbname = process.env.DBNAME1
//console.log(dbname)
const dbURI = "mongodb+srv://henock:2EDO2c6bNBx8Waq2@cluster0.ff35n.mongodb.net/shop?retryWrites=true&w=majority"
//console.log(process.env.PASSWORD)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log("Connected to Database")
}).catch((err => console.log(err + "THIS IS THE ERROR")))



app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));
