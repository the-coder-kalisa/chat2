const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 5000;
const url = "mongodb://localhost:27017/thecoder"
const User = require('./routes/user.js');
const messages = require('./routes/messageRoutes.js')
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json())
app.use("/user/", User)
app.use("/messages/", messages)
mongoose
.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Db connection established.");
})
.catch((err)=>{
    console.log(err.message);
})

const server = app.listen(port, ()=>{
    console.log(`server started on Port http://localhost:${port}`);
})