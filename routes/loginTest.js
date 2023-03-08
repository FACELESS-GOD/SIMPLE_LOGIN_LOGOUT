var express = require('express');
const mysql = require('mysql2');
var crypto = require('crypto');
const { Console } = require('console');
var router = express.Router();

const connection  = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'Test@123$$',
    database:'new_database',
    port:3306
});
/* GET home page. */
router.post('/', function(req, res, next) {
 console.log();
     var username =  req.body.userName.toString();

    var password = crypto.createHash('md5').update(req.body.password).digest('hex').toString() ; 
    var query2 = `SELECT PASS_WORD FROM persons WHERE USERNAME = "${username}"`; 
    connection.query(query2 , (err, results, fields)=>{
        if(err)
        {
            res.send("error Occured");
            console.log(err);   
        }
        else
        {
            if(results[0].PASS_WORD===password)
            {res.send("Password is correct");}
            else{
                res.status(400);
                res.send("password is incorrect");
            }
        }
    });
   


});

module.exports = router;