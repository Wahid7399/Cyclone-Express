var mysql = require('mysql');

module.exports= (req, res) => {
    var con = mysql.createConnection({
        host : 'localhost',
        user:"root",
        password:"",
          database : 'web'
        });
      con.connect()
    var data=req.body;
      con.query(`insert into comments(username,body,pid) values(
     '${data.email}','${data.comment}','${data.pid}'
          )`, (err, rows, fields) => {
        if (err) throw err
        res.send("Comment Added")
      })
      con.end()
  }
