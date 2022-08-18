const express=require('express')
const app=express()
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const bodyParser = require('body-parser')
const morgan=require('morgan')
const routes=require('./api/routes/index')


require("./api/models/user");
require('./config/passport')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api",routes)

app.listen(8800, () => {
    console.log("Server started listening on port 8800....");
})