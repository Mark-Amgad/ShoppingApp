import { Request, Response } from "express";
import express from "express";
import { Product } from "../classes/product";
import { ProductTable } from "../models/productModel";
import db from "../database";
import { userAuthentication,adminAuthentication } from "./userHandler";


// product endpoints
const productHandler = (app:express.Application)=>{
    app.get("/products/index",userAuthentication,indexHandler);
    app.get("/products/show/:productId",showHandler);
    app.post("/products/create",adminAuthentication,createHandler);
    app.put("/products/update",adminAuthentication,updateHandler);
    app.delete("/products/delete",adminAuthentication,deleteHandler);
};
const indexHandler = async(req:Request,res:Response)=>{

    try
    {
        const product_table = new ProductTable();
        const result = await product_table.index();
        return res.send({"products" : result}).status(200);
    }
    catch(err)
    {
        return res.send({"message":"failed!"});
        console.log(err);
        throw new Error(`${err}`);
    }
};

const showHandler = async(req:Request,res:Response)=>{
    try
    {
        const prod_table = new ProductTable();
        const product = await prod_table.show(Number(req.params.productId));
        if(product["id"]===null) throw new Error();
        return res.send({"product":product});

    }
    catch(err)
    {
        //console.log(err);
        return res.send({"msg":"This id does not exist"});
    }
};


const createHandler = async(req:Request,res:Response)=>{
    try
    {
        const productName = req.body.name;
        const productDescription = req.body.description;
        const productPrice = Number(req.body.price);
        const productCategory = req.body.category;
        const productStatus = Number(req.body.status);
        const prod:Product = new Product(productName,
            productDescription,
            productPrice,
            productCategory,
            productStatus);
        const prod_table = new ProductTable();
        const result = await prod_table.create(prod);
        return res.send({"msg":"added successfully","added":1,"porduct":result}).status(200);
        //res.json(result).status(200);
    }
    catch(err)
    {
        return res.send({"msg":"failed!","added":0}).status(200);
        console.log(err);
        //throw new Error(`${err}`);
    }

};

const updateHandler = async(req:Request,res:Response)=>{
    try
    {
        const productName = req.body.name;
        const productDescription = req.body.description;
        const productPrice = Number(req.body.price);
        const productCategory = req.body.category;
        const productStatus = Number(req.body.status);
        const ID = Number(req.body.id);
        const prod:Product = new Product(productName,
            productDescription,
            productPrice,
            productCategory,
            productStatus);

        const prod_table = new ProductTable();
        const result = await prod_table.update(ID,prod);
        res.send({"msg":"updated successfully"}).status(200);
        //res.json(result).status(200);
    }
    catch(err)
    {
        console.log(err);
    }
};

const deleteHandler = async(req:Request,res:Response)=>{
    try
    {
        const ID = Number(req.body.id);
        const prod_table = new ProductTable();
        await prod_table.delete(ID);
        res.send("Delete successfully").status(200);
    }
    catch(err)
    {
        console.log(err);
    }
};

export default productHandler;