export class User
{
    private id:number|undefined;
    private user_name:string;
    private password:string;
    private first_name:string;
    private last_name:string;
    private balance:number = 500;
    private type:number;

    constructor(user_name:string,password:string,first_name:string,last_name:string,type:number)
    {
        this.user_name = user_name;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.type = type;
    }

    public setUserName(user_name:string):void
    {
        this.user_name = user_name;
    }
    public setPassword(password:string):void
    {
        this.password = password;
    }
    public setFirstName(first_name:string):void
    {
        this.first_name = first_name;
    }
    public setLastName(last_name:string):void
    {
        this.last_name = last_name;
    }
    public setType(type:number):void
    {
        this.type = type;
    }
    public setBalance(balance:number):void
    {
        this.balance = balance;
    }


    public getUserName():string
    {
        return this.user_name;
    }
    public getPassword():string
    {
        return this.password;
    }
    public getFirstName():string
    {
        return this.first_name;
    }
    public getLastName():string
    {
        return this.last_name;
    }
    public getType():number
    {
        return this.type;
    }
    public getBalance():number
    {
        return this.balance;
    }


}