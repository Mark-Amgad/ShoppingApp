import { Product } from "../classes/product";
import db from "../database";

export class ProductTable
{
    async index():Promise<[Product]>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM product";
            let result:any = await connection.query(query);
            result = result.rows;
            connection.release();
            return result;

        }
        catch(err)
        {
            console.log("model - product -index-error");
            throw new Error(`${err}`);
        }
    }

    async show(id:number):Promise<Product>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM product WHERE id = $1";
            let result = await connection.query(query,[id]);
            connection.release();
            return result.rows[0];
            

        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    }

    async create(prod:Product):Promise<Product>
    {
        try
        {
            const connection = await db.connect();
            const query:string = "INSERT INTO product(name,price,category,status,description,likes,dislikes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
            let result:any = await connection.query(query,[
                prod.getName(),
                prod.getPrice(),
                prod.getCategory(),
                prod.getStatus(),
                prod.getDescription(),
                prod.getLikes(),
                prod.getDislikes()
            ]);
            result = result.rows[0];
            connection.release();
            return result;
        }
        catch(err)
        {
            console.log("model - product - create - error");
            throw new Error(`${err}`);
        }
    }

    async update(id:number,prod:Product):Promise<Product>
    {
        try
        {
            const connection = await db.connect();
            const query = "UPDATE product SET name =$1,price=$2,category=$3,status=$4,description=$5,likes=$6,dislikes=$7 WHERE id=$8";
            await connection.query(query,[
                prod.getName(),
                prod.getPrice(),
                prod.getCategory(),
                prod.getStatus(),
                prod.getDescription(),
                prod.getLikes(),
                prod.getDislikes(),
                id
            ]);
            const query2 = "SELECT * FROM product WHERE id=$1";
            let result:any = await connection.query(query2,[id]);
            result = result.rows;
            connection.release();
            return result[0];
        }
        catch(err)
        {
            console.log("model - product - update - error");
            throw new Error(`${err}`);
        }
    }

    async delete(id:number):Promise<void>
    {
        try
        {
            const connection = await db.connect();
            const query = "DELETE FROM product WHERE id = $1";
            const result = await connection.query(query,[id]);
            connection.release();
        }
        catch(err)
        {
            console.log("model - product - delete - error");
            throw new Error(`${err}`);
        }
    }
}