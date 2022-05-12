import Order from "../classes/order";
import { OrderTable } from "../models/orderModel";
import express,{Application, Request,Response} from "express";
import db from "../database";
import { userAuthentication, adminAuthentication } from "./userHandler";

const OrderHandler = (app:Application)=>{
    app.get("/orders/index",adminAuthentication,indexHandler);
    app.post("/orders/create",userAuthentication,createHandler);
    app.get("/orders/update",updateHandler);
    app.delete("/orders/delete",adminAuthentication,deleteHandler);
    app.get("/orders/details",adminAuthentication,ordersProductsHandler);
    app.post("/orders/add_product",userAuthentication,addProductHandler);
    app.delete("/orders/remove_product",userAuthentication,removeProductHandler);
};

const indexHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_table = new OrderTable();
        const result = await order_table.index();
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handler - order - index - error");
    }
};

const createHandler = async(req:Request,res:Response)=>{
    try
    {
        const userId = Number(req.body.userId);
        const order_table = new OrderTable();
        const o:Order = new Order(userId,1);
        const result = await order_table.create(o);
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handler - order - create - error");
        res.send("Wrong inputs");
    }
};

const updateHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_table = new OrderTable();
        const ID:number = 1;
        const o:Order = new Order(2,1);
        const result = await order_table.update(o,ID);
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handler - order - update - error");
        res.send("Wrong inputs");
    }
};

const deleteHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_table:OrderTable = new OrderTable();
        const ID = Number(req.body.orderId); // order id 
        await order_table.delete(ID);
        res.json("DELETED").status(200);
    }
    catch(err)
    {
        console.log("handler - order - delete - error");
        res.send("Wrong inputs");
    }
};


const ordersProductsHandler = async (req:Request,res:Response)=>{
    try
    {
        const connection = await db.connect();
        const query = "SELECT * FROM orders_products";
        let result:any = await connection.query(query);
        result = result.rows;
        res.json(result);
        
    }
    catch(err)
    {
        res.send("Invalid data");
    }
};
const addProductHandler = async(req:Request,res:Response)=>{
    try
    {
        const order_id = Number(req.body.orderId);
        const product_id = Number(req.body.productId);
        const quantity:number = Number(req.body.quantity);
        const query1 = "INSERT INTO orders_products (order_id,product_id,quantity)VALUES($1,$2,$3);";
        const connection = await db.connect();
        await connection.query(query1,[order_id,product_id,quantity]);
        const query2 = "SELECT number_of_products,total_money FROM orders WHERE id=$1;";
        const order_data = await connection.query(query2,[order_id]);
        let number_of_products:number = order_data.rows[0]["number_of_products"];
        let total_money = order_data.rows[0]["total_money"];
        const query3 = "SELECT price FROM product WHERE id=$1";
        const result = await connection.query(query3,[product_id]);
        let price = result.rows[0]["price"];
        number_of_products += quantity;
        total_money += (price*quantity);
        const query4 = "UPDATE orders SET number_of_products=$1,total_money=$2 WHERE id = $3;";
        await connection.query(query4,[number_of_products,total_money,order_id]);
        res.send("product has been added successfully");
        
    }
    catch(err)
    {
        console.log(err);
        res.send("Invalid data");
    }
    


};

const removeProductHandler = async(req:Request,res:Response)=>{
    try
    {
        const productID:number = Number(req.body.productId);
        const orderID:number = Number(req.body.orderId);
        const query = "DELETE FROM orders_products WHERE order_id = $1 AND product_id = $2";
        const connection = await db.connect();
        await connection.query(query , [orderID,productID]);
        res.send("this product has been removed successfully");
    }
    catch(err)
    {
        console.log(err);
        res.send("error occured");
    }
};



export default OrderHandler;