import express from "express";

const app = express();
const port = 3000;
app.listen(port,()=>{console.log("Server is alive :D")});

app.get("/",(req,res)=>
{
    res.send("main page");
});