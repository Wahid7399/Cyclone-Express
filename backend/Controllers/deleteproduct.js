var mysql = require('mysql');

module.exports= async (req, res) => {
    var con = mysql.createConnection({
      host: 'db4free.net',
      user: 'wahid123',
      password: '12345678',
      database: 'database3021',
        });
      con.connect()
     
    var data=req.body;
      con.query(`delete from product where id = ${req.params.id }`, (err, rows, fields) => {
       
        if (err) throw err;
      })
      con.end()
     res.redirect("http://localhost:3000/home")
  }
