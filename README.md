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

### users - sign up

* URL : http://localhost:3000/users/create
* Method: POST
* URL body: userName, password, firstName, lastName
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


### users - login

* URL : http://localhost:3000/users/login
* Method: POST
* URL body: userName, password
* Example :<br>
```
{
    "userName" : "mark4",
    "password" : "1234"
}
```
* Response : if user name and password are correct, JWT will be generated containing user information including user type(client or admin)
* Positive response:<br>
```
{
    "msg": "Loggedin successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjpudWxsLCJpYXQiOjE2NTYzMjc3ODV9.eY5ZBO6dWKWjAQs90eWbFc61EIom4V25Xn3b4GhEEYI"
}
```
* Negative response:<br>
```{"msg": "Wrong user name"}``` OR ```{"msg": "Wrong password"}```










 
