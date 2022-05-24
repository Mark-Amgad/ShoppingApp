import express from "express";
import db from "./database";
import OrderHandler from "./handlers/orderHandler";
import productHandler from "./handlers/productHandler";
import userHandler from "./handlers/userHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();;
const port = 3000;
app.listen(port,()=>{console.log("Server is alive :D")});
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get("/",async(req,res)=>
{
    const connection = await db.connect();
    const ans = await connection.query("SELECT * FROM test");
    res.send(ans.rows[0]);
});

productHandler(app);
userHandler(app);
OrderHandler(app);