var mysql = require('mysql');

module.exports= (req, res) => {
    var con = mysql.createConnection({
        host : 'localhost',
        user:"root",
        password:"",
          database : 'web'
        });
      con.connect()
      con.query(`select * from user where email ='${req.body.email}'`, (err, rows, fields) => {
        if (err) throw err
        if(rows.length==0)
        res.send({isAvailable:false});
        else
        res.send({isAvailable:false});
      })
      con.end
  }
