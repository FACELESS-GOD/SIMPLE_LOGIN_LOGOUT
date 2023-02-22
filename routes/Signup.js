var express = require('express');
const mysql = require('mysql2');
var crypto = require('crypto');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    const connection  = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'Test@123$$',
        database:'new_database',
        port:3306
    });
    var username =  req.body.userName.toString();
    var password = crypto.createHash('md5').update(req.body.password).digest('hex').toString() ; 
    console.log(password);
    var email = req.body.email.toString() ;
    var query = `INSERT INTO persons VALUES("${username}","${password}","${email}")`;
    //var query = `INSERT INTO persons(USERNAME , PASS_WORD , EMAIL) VALUES("${username}","${password}","${var}")`;
 //   let query2 = "INSERT INTO persons(USERNAME , PASS_WORD , EMAIL) VALUES('usename','password','email');";
    console.log(query); 
    connection.query(query , (err, results, fields)=>{
        if(err)
        {
            res.send("error Occured");
            console.log(err);
        }
        else
        {res.send("it is working !");}
    });
   

});

module.exports = router;