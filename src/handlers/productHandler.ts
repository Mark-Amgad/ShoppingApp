import { Request, Response } from "express";
import express from "express";
import { Product } from "../classes/product";
import { ProductTable } from "../models/productModel";

const productHandler = (app:express.Application)=>{
    app.get("/products/index",indexHandler);
    // change it to post,put,delete request
    app.post("/products/create",createHandler);
    app.put("/products/update",updateHandler);
    app.delete("/products/delete",deleteHandler);
};
const indexHandler = async(req:Request,res:Response)=>{

    try
    {
        const product_table = new ProductTable();
        const result = await product_table.index();
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log(err);
        throw new Error(`${err}`);
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
        res.send("Successfully added").status(200);
        //res.json(result).status(200);
    }
    catch(err)
    {
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
        res.send("updated successfully").status(200);
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