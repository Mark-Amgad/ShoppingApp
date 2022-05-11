class Order
{
    private id:number|undefined;
    private user_id:number;
    private status:number;
    private total_money:number = 0;
    private number_of_products:number = 0;

    constructor(userId:number,status:number)
    {
        this.user_id = userId;
        this.status = status;
    }

    public getUserId():number
    {
        return this.user_id;
    }
    public getStatus():number
    {
        return this.status;
    }
    public getTotalMoney():number
    {
        return this.total_money;
    }
    public getNumberOfProducts():number
    {
        return this.number_of_products;
    }



    public setUserId(userId:number):void
    {
        this.user_id = userId;
    }
    public setStatus(status:number):void
    {
        this.status = status;
    }
    public setTotalMoney(totalMoney:number):void
    {
        this.total_money = totalMoney;
    }
    public setNumberOfProducts(numberOfProducts:number):void
    {
        this.number_of_products = numberOfProducts;
    }

    public addProduct():void
    {
        this.number_of_products += 1;
    }
}

export default Order;