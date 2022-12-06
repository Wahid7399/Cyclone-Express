var mysql = require('mysql');

module.exports= (req, res) => {
    var con = mysql.createConnection({
      host: 'db4free.net',
      user: 'wahid123',
      password: '12345678',
      database: 'database3021',
        });
      con.connect()
      con.query(`delete from sessions`, (err, rows, fields) => {
        if(err)throw err
        res.send("Deleted")
      })
      con.end

  }
