var mysql = require('mysql');
module.exports= (req, res) =>{
    var con = mysql.createConnection({
      host: 'db4free.net',
      user: 'wahid123',
      password: '12345678',
      database: 'database3021',
        });
      con.connect()
    var data=req.body;
      con.query(`insert into message(sid,sname,rname,message,rid) values(
      '${data.sid}','${data.sname}','${data.rname}',"${data.msg}",${data.rid}
          )`, (err, rows, fields) => {
        if (err) throw err
        res.send("Message sent")
      })
      con.end()
  }




