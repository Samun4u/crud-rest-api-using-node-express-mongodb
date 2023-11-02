const express = require('express');

const {LogReqRes} = require('./middlewares')
const {connectionMongoDb} = require('./connection');
const userRouter = require('./routes/user');

const app = express();
const port = 8000;

//connection
connectionMongoDb("mongodb://127.0.0.1:27017/node-project-one").then(()=>{
    console.log("Mongodb connected!")
})

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(LogReqRes('./logs/log.txt'));

//Routes
app.use("/api/users",userRouter);

app.listen(port,()=>{
    console.log(`Server Connected to ${port}`);
})

