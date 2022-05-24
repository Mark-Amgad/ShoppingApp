import { User } from "../classes/user";
import { UserTable } from "../models/userModel";
import express, { Request, Response } from "express";
import db from "../database";





const userHandler = (app:express.Application)=>{
    app.get("/users/index",adminAuthentication,indexHandler);
    app.post("/users/create",createHandler);
    app.put("/users/update",adminAuthentication,updateHandler);
    app.delete("/users/delete",adminAuthentication,deleteHandler);
    app.post("/users/login",loginHandler);
    app.get("/users/logout",logoutHandler);
};

const indexHandler = async(req:Request,res:Response)=>{
    try
    {
        const user_table = new UserTable();
        const result = await user_table.index();
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handler - user- index-error");
        //throw new Error(`${err}`);
    }
};

const createHandler = async(req:Request,res:Response)=>{
    try
    {
        
        const userName:string = req.body.userName;
        const firstName:string = req.body.firstName;
        const lastName:string = req.body.lastName;
        const password:string = req.body.password;// the password will be encrypted later
        
        if(userName.length < 4 || firstName.length < 4 || lastName.length <4 || password.length<2)
        {
            return res.json("Invalid DATA");
        }
        const new_user:User = new User(userName,password,firstName,lastName,1);
        const user_table = new UserTable();
        await user_table.create(new_user);

        return res.json("Account created Successfully!").status(200);
    }
    catch(err)
    {
        res.json("This user name is used or Invalid data");
        //throw new Error(`${err}`);
    }
};

const updateHandler = async(req:Request,res:Response)=>{
    try
    {
        const ID:number = Number(req.body.userId);
        const userName:string = req.body.userName;
        const firstName:string = req.body.firstName;
        const lastName:string = req.body.lastName;
        const password:string = req.body.password;
        
        const updated_user:User = new User(userName,password,firstName,lastName,1);
        const user_table = new UserTable();
        await user_table.update(updated_user,ID);
        res.json("Updated successfully").status(200);
    }
    catch(err)
    {
        console.log("handler - user- update-error");
        //throw new Error(`${err}`);
    }
};

const deleteHandler = async(req:Request,res:Response)=>{
    try
    {
        const ID:number = Number(req.body.userId);
        const user_table = new UserTable();
        await user_table.delete(ID);
        return res.json("this account was deleted successfully")
    }
    catch(err)
    {
        console.log("handler - user- delete-error");
        return res.json("Invalid ID");
        //throw new Error(`${err}`);
    }
};

const loginHandler = async(req:Request,res:Response)=>{
    try
    {
        const userName:string = req.body.userName;
        const password:string = req.body.password;
        const connection = await db.connect();
        const query1 = "SELECT * FROM users WHERE user_name = $1";
        const result = await connection.query(query1,[userName]);
        const correctPassword = result.rows[0]["password"];
        console.log(req.body);
        if(password == correctPassword)
        {
            const type:number = Number(result.rows[0]["type"]);
            const userName = result.rows[0]["user_name"];
            const firstName = result.rows[0]["first_name"];
            const lastName = result.rows[0]["last_name"];
            /*
            res.cookie("type",type);
            res.cookie("firstName",firstName);
            res.cookie("lasttName",lastName);
            res.cookie("userName",userName);
            */
            res.send({msg : "logged in successfully" , type:type,userName:userName,firstName:firstName,lastName:lastName});
        }
        else
        {
            res.send("Wrong password, please try again");
        }

    }
    catch(err)
    {
        console.log(err);
        res.send("err - wrong user name");
    }
};

const logoutHandler = async(req:Request,res:Response)=>{
    try
    {
        res.clearCookie("type");
        return res.send("logged out");
    }
    catch(err)
    {
        console.log(err);
        res.send("error happend");
    }
};

export const userAuthentication = async(req:Request,res:Response,next:Function)=>{
    try
    {
        const type = Number(req.cookies.type);
        if(type == 1 || type == 2)
        {
            next();
        }
        else
        {
            res.send("You have to loggin first.");
            //res.send({hh: "hh"})
        }
    }
    catch(err)
    {
        console.log(err);
        res.send("You have to loggin first.");
    }
};

export const adminAuthentication = async(req:Request,res:Response,next:Function)=>{
    try
    {
        const type = Number(req.cookies.type);
        if(type == 2)
        {
            next();
        }
        else
        {
            res.send("You are not the Admin to access this page!");
        }
    }
    catch(err)
    {
        res.send("You are not the Admin to access this page!");
        console.log(err);
    }
};


export default userHandler;