var express = require('express');
var router = express.Router();

router.post('/',(req,res)=>{
    const connection  = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'Test@123$$',
        database:'new_database',
        port:3306
    });
    var username =  req.body.userName.toString();
   var password = crypto.createHash('md5').update(req.body.password).digest('hex').toString() ; 
   var query = `SELECT PASS_WORD FROM persons WHERE USERNAME="${username}"`; 
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
module.exports = router ; 