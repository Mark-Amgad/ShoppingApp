import Order from "../classes/order";
import db from "../database";

export class OrderTable
{
    async index():Promise<[Order]>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM orders";
            let result:any = await connection.query(query);
            result = result.rows;
            connection.release();
            return result;
        }
        catch(err)
        {
            console.log("model - order - index - error");
            throw new Error(`${err}`);
        }
    }

    async create(o:Order):Promise<Order>
    {
        try
        {
            const connection = await db.connect();
            const query = "INSERT INTO orders (user_id,status,total_money,number_of_products)"+
            "VALUES ($1,$2,$3,$4) RETURNING *;";
            let result:any = await connection.query(query,[
                o.getUserId(),
                o.getStatus(),
                o.getTotalMoney(),
                o.getNumberOfProducts()
            ]);
            result = result.rows;
            connection.release();
            return result[0];
        }
        catch(err)
        {
            console.log("model - order - create - error");
            throw new Error(`${err}`);
        }
    }

    async update(o:Order,ID:number):Promise<Order>
    {
        try
        {
            const connection = await db.connect();
            const query = "UPDATE orders SET user_id=$1,status=$2,total_money=$3"+
            "number_of_products=$4 WHERE id = $5 RETURNING *;";
            let result:any = connection.query(query,[
                o.getUserId(),
                o.getStatus(),
                o.getTotalMoney(),
                o.getNumberOfProducts(),
                ID
            ]);
            result = result.rows;
            connection.release();
            return result[0];
        }
        catch(err)
        {
            console.log("model - order - update - error");
            throw new Error(`${err}`);
        }
    }

    async delete(ID:number):Promise<void>
    {
        try
        {
            const connection = await db.connect();
            const query = "DELETE FROM orders WHERE id=$1";
            await connection.query(query,[
                ID
            ]);
            connection.release();

        }
        catch(err)
        {
            console.log("model - order - delete - error");
            throw new Error(`${err}`);
        }
    }
}