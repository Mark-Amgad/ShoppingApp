export class Product
{
    private id:number | undefined;
    private name:string;
    private price:number;
    private category:string;
    private status:number;
    private description:string;
    private likes:number|undefined = 0;
    private dislikes:number|undefined = 0;

    constructor(name:string,descr:string,price:number,category:string,status:number)
    {
        this.name = name;
        this.price = price;
        this.category = category;
        this.status = status;
        this.description = descr;
    }

    public setName(name:string):void
    {
        this.name = name;
    }
    public setDescription(description:string):void
    {
        this.description = description;
    }
    public setPrice(price:number):void
    {
        this.price = price;
    }
    public setCategory(category:string):void
    {
        this.category = category;
    }
    public setStatus(status:number):void
    {
        this.status = status;
    }
    public setLikes(likes:number):void
    {
        this.likes = likes;
    }
    public setDislikes(disLikes:number):void
    {
        this.dislikes = disLikes;
    }




    public getId():number
    {
        let ID = Number(this.id);
        return ID;
    }
    public getName():string
    {
        return this.name;
    }
    public getDescription():string
    {
        return this.description;
    }
    public getPrice():number
    {
        return this.price;
    }
    public getCategory():string
    {
        return this.category;
    }
    public getStatus():number
    {
        return this.status;
    }
    public getLikes():number | undefined
    {
        return this.likes;
    }
    public getDislikes():number | undefined
    {
        let dislikes = Number(this.dislikes);
        return this.dislikes;
    }
}