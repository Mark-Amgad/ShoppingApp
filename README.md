# Shopping app

## How to setup the project locally ?

**Note: Node and postgress must be installed on your machine.**<br>
**step 1:** in terminal run : ```npm install ``` <br>
**step 2:** change ```database.json``` file with your local parameters.<br> Ex:
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

**step 3:** run ```npm run build_tables ```<br>
**step 4:** run ```npm run start```<br>







 
