var mysql = require('mysql');

module.exports= async (data) => {
 
    var con = mysql.createConnection({
      host: 'db4free.net',
      user: 'wahid123',
      password: '12345678',
      database: 'database3021',
        });
      con.connect()
      var arr=[]

      con.query(`insert into product(
        ,sprice,avatar) values(
      '${data.description}','${data.price}','${data.avatar}',${data.sprice}
          )`, (err, rows, fields) => {
        if (err) throw err;
      })
      con.end()
     res.redirect("http://localhost:3000/home")
  }
