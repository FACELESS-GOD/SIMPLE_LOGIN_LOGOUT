var express = require('express');
const mysql = require('mysql2');
var crypto = require('crypto');
const { Console } = require('console');
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
    var email = req.body.email.toString() ;
    var Insertion_query = `INSERT INTO persons VALUES("${username}","${password}","${email}")`;
    var USERNAME_CHECK_Query = `SELECT * FROM persons WHERE EXISTS (SELECT * FROM persons WHERE USERNAME = "${username}"); ` ;
    var EMAIL_CHECK_Query = `SELECT * FROM persons WHERE EXISTS (SELECT * FROM persons WHERE EMAIL = "${email}"); ` ;
    connection.query(USERNAME_CHECK_Query , (err , results , fields)=>{
        if(err)
        {
            res.send("Error Occured");
            res.status(404);
        }
        else
        { 
           if(results.length!=0)
           {
            res.status(500);
            res.send("Username is not Unique");
            
           }
           else
           {
            connection.query(EMAIL_CHECK_Query , (err , results , fields)=>{
                if(err)
                {
                    res.status(404);
                    res.send(err);
                }
                else
                {
                    if(results.length!=0)
                    {
                        res.status(500);
                        res.send("Email is already in use");
                    }
                    else{
                        connection.query(Insertion_query , (err, results, fields)=>{  
                            if(err)
                            {
                                res.send("error Occured");
                                console.log(err);
                            }
                            else
                            {
                                res.status(200);
                                res.send("it is working !");
                            }
                        });
                    }
                }
            });
           }

        }
    });
});

module.exports = router;