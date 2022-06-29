# Shopping app

## How to setup the project locally ?

**Note: Node and postgress must be installed on your machine.**<br>
**step 1:** Download the project in a folder on your computer and direct your terminal to this folder. ex: ```YourDirectory/folderName/``` <br>
**step 1:** run : ```npm install``` in your terminal (to insall node_modules) <br>
**step 2:** change ```database.json``` file with your local parameters.(important for the next step)<br> Ex:
```
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "mobi_shop_system",
      "user": "postgres",
      "password": "1234"
    }
}
```
<br>

**step 3:** run ```npm run build_tables ``` in your terminal(to build the needed tebles in your database)<br>
**step 4:** run ```npm run start``` in your terminal (to start the server)<br>


## REST APIs

### 1. users - sign up

* URL : http://localhost:3000/users/create
* Method: POST
* Required body: userName, password, firstName, lastName
* Example :<br>
```
{
    "userName" : "mark4",
    "password" : "1234",
    "firstName" : "Mark",
    "lastName" : "Amgad"
}
```
* Response : json format with 2 keys (msg, signed)
* Positive response:<br>
```
{
    "msg": "Account created Successfully!",
    "created": 1
}
```
* Negative and failed response:<br>
```
{
    "msg": "This user name is already exist!",
    "created": 0
}
```


### 2. users - login

* URL : http://localhost:3000/users/login
* Method: POST
* Required body: userName, password
* Example :<br>
```
{
    "userName" : "mark4",
    "password" : "1234"
}
```
* Response : if userName and password are correct, JWT will be generated containing user information including user type(1(client) , 2(admin))
* Positive response:<br>
```
{
    "msg": "Loggedin successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjpudWxsLCJpYXQiOjE2NTYzMjc3ODV9.eY5ZBO6dWKWjAQs90eWbFc61EIom4V25Xn3b4GhEEYI"
}
```
* Negative response:<br>
```{"msg": "Wrong user name"}``` OR ```{"msg": "Wrong password"}```

### 3. users - all

* URL : http://localhost:3000/users/index
* Method: GET
* Required login: admin only
* Required body: --
* Response : list of all users
* Positive response:(list of json)<br>
```
[
    {
        "id": 2,
        "user_name": "mark12",
        "password": "$2b$10$ddy7u8UhZR/Mwmihg0pqBe/RxbOsF9VGS0HxTBeNYW6yPPgVHECtG",
        "first_name": "Mark",
        "last_name": "Amgad",
        "balance": 500,
        "type": 1
    },
    ...
]
```
* Negative response(from the admin authentication middleware):<br>
```{"msg": "You are not the Admin to access this page!"}```



### 4. products - create

* URL : http://localhost:3000/products/create
* Method: POST
* Required login: admin only
* Required body: name, description, price, category, status<br>
* Example: <br>
```
{
    "name" : "Iphone-10",
    "description" : "ANY TEXT HERE",
    "price":500,
    "category":"mobiles",
    "status" : 1
}
```

* Response : msg, added, product(json)
* Positive response:<br>
```
{
    "msg": "added successfully",
    "added": 1,
    "porduct": {
        "id": 3,
        "name": "Iphone-10",
        "price": 500,
        "category": "mobiles",
        "status": 1,
        "description": "ANY TEXT HERE",
        "likes": 0,
        "dislikes": 0
    }
}
```
* Negative response:<br>
```{"msg": "failed!","added": 0}```


### 5. products - all

* URL : http://localhost:3000/products/index
* Method: GET
* Required login: client or admin
* Required body: --<br>
* Response : products(list of json format)
* Positive response:<br>
```
{
    "products": [
        {
            "id": 1,
            "name": "Iphone-10",
            "price": 500,
            "category": "mobiles",
            "status": 1,
            "description": "ANY TEXT HERE",
            "likes": 0,
            "dislikes": 0
        },
        ...
        ]
}
```
* Negative response:<br>
```{"msg": "failed!"}```




### 6. products - show

* URL : http://localhost:3000/products/show/id
* Method: GET
* Required login: client or admin
* Required params: id<br>
* Example:
```http://localhost:3000/products/show/1 ```
* Response : product(json)
* Positive response:<br>
```
{
    "id": 1,
    "name": "Iphone-10",
    "price": 500,
    "category": "mobiles",
    "status": 1,
    "description": "ANY TEXT HERE",
    "likes": 0,
    "dislikes": 0
}
```
* Negative response:<br>
```{"msg": "This id does not exist"}```













 


### 7. products - update

* URL : http://localhost:3000/products/update
* Method: PUT
* Required login: admin only
* Required body: name, description, price, category, status<br>
* Example:
```
{
    "name" : "Iphone-10",
    "description" : "ANY TEXT HERE",
    "price":500,
    "category":"mobiles",
    "status" : 1
}
```
* Response : product(json)
* Positive response:<br>
```{"msg":"updated successfully"}```
* Negative response:<br>
```{"msg": "failed!"}```


### 8. products - delete

* URL : http://localhost:3000/products/delete
* Method: DELETE
* Required login: admin only
* Required body: id<br>
* Example:
```{"id" : "3"}```
* Positive response:<br>
```{"msg":"Deleted successfully"}```
* Negative response:<br>
```{"msg": "This id doesn't exist!"}```












### 9. orders - create

* URL : http://localhost:3000/orders/create
* Method: POST
* Required login: client or admin
* Required body:productsIds(list),amounts(list), userName, totalMoney, numberOfProducts<br>
* Example:
```
{
    "userName" : "mark1","productsIds":[1,2],
    "amounts" : [4,4],
    "totalMoney" : 5000,
    "numberOfProducts":8
}
```
* Positive response:<br>
```{"msg":"Order created"}```
* Negative response:<br>
```{"msg": "Wrong inputs"}```


