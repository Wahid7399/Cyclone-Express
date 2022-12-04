var mysql = require('mysql');

module.exports= (req, res) => {
    var con = mysql.createConnection({
        host : 'localhost',
        user:"root",
        password:"",
          database : 'web'
        });
      con.connect()
      con.query(`delete from sessions`, (err, rows, fields) => {
        if(err)throw err
        res.send("Deleted")
      })
      con.end

  }
