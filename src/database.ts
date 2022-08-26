import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.POSTGRES_HOST || "localhost"; // localhost
const userName = process.env.POSTGRES_USERNAME  || "postgres";
const password = process.env.POSTGRES_PASSWORD || "mark1999";
const databaseName = process.env.POSTGRES_DATABASENAME || "mobi_shop_system";
console.log(host);
console.log(userName);
console.log(password);
console.log(databaseName);
const db = new Pool({
    host:host,
    user:userName,
    password:password,
    database:databaseName
});

export default db;