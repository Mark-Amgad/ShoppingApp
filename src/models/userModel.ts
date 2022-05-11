import { User } from "../classes/user";
import db from "../database";

export class UserTable
{
    async index():Promise<[User]>
    {
        try
        {
            const connection = await db.connect();
            const query = "SELECT * FROM users";
            let result:any = await connection.query(query);
            result = result.rows;
            connection.release();
            return result;
            
        }
        catch(err)
        {
            console.log("model - user - index - error");
            throw new Error(`${err}`);
        }
    }

    async create(u:User):Promise<User>
    {
        try
        {
            const connection = await db.connect();
            const query = "INSERT INTO users (user_name,password,first_name,last_name,balance,type) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;";
            let result:any = await connection.query(query,[
                u.getUserName(),
                u.getPassword(),
                u.getFirstName(),
                u.getLastName(),
                u.getBalance(),
                u.getType()
            ]);
            result = result.rows;
            connection.release();
            return result[0];

        }
        catch(err)
        {
            console.log("model - user - create - error");
            throw new Error(`${err}`);
        }
    }

    async update(u:User,id:number):Promise<User>
    {
        try
        {
            const connection = await db.connect();
            console.log(u);
            const query = "UPDATE users SET user_name=$1,password=$2,first_name=$3,last_name=$4,balance=$5,type=$6 WHERE id=$7 RETURNING * ;";
            let result:any = await connection.query(query,[
                u.getUserName(),
                u.getPassword(),
                u.getFirstName(),
                u.getLastName(),
                u.getBalance(),
                u.getType(),
                id
            ]);
            console.log(result);
            result = result.rows;
            connection.release();
            return result[0];
        }
        catch(err)
        {
            console.log("model - user - update - error");
            throw new Error(`${err}`);
        }
    }

    async delete(id:number):Promise<void>
    {
        try
        {
            const connection = await db.connect();
            const query = "DELETE FROM users WHERE id = $1;";
            await connection.query(query,[id]);
            connection.release();
        }
        catch(err)
        {
            console.log("model - user - delete - error");
            throw new Error(`${err}`);
        }
    }
}