# [Basic Login System with Node.js, Express, and MySQL](https://codeshack.io/basic-login-system-nodejs-express-mysql/)

For this tutorial we'll be doing something a little different, instead of developing applications with PHP we'll be creating a login system with Node.js, Express, and MySQL.

## Requirements
- MySQL Server
- Node.js
- Express - Install with command: `npm install express`.
- Express Sessions - Install with command: `npm install express-session`.
- MySQL for Node.js - Install with command: `npm install mysql`.
## File Structure
\-- nodelogin
    |-- login.html
    |-- login.js

# Creating the Login System
This is just a basic login form design we'll use for our login system, the method for the form is set to `POST` and the action is set to `auth`, the form data will be sent to our node server using this method.
```html
<form action="auth" method="POST">
  <input type="text" name="username" placeholder="Username" required>
  <input type="password" name="password" placeholder="Password" required>
  <input type="submit">
</form>
```

## How to install MySQL
Install with command:
```
npm install mysql
```
create the following variables and require the modules:
```js
var mysql = require('mysql');
```
### Connect to MySQL server
```js
var client = mysql.createClient({
  host: 'sample.com',
  user: 'user name',
  password: 'pass',
  database: 'database name'
});
```
You can also create new database from Node.js side with following code.
```js
client.query('CREATE DATABASE sample');
client.useDatabase('sample');
```
### Manipulate CRUD for create/read/update/delete data
- Create new data
```sql
client.query('INSERT INTO user’, {name:'taro', age:30}, function(error, response) {

  if(error) throw error;

  console.log(response);

})
```
- Read the data
```sql
client.query('SELECT * FROM user’, function(error, response) {

  if(error) throw error;

  console.log(response);

})
```
- Update the data
```sql
client.query('UPDATE user SET age = ? WHERE name = ?’, [35, ’taro’], function(error, response) {

  if(error) throw error;

  console.log(response);

})
```
- Delete the data
```sql
client.query('DELETE FROM user WHERE name = ?’, [’taro’], function(error, response) {

  if(error) throw error;

  console.log(response);

})
```