var mysql = require('mysql');

const nodemailer = require("nodemailer");
const sendpin = require('./sendpin');
 function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}
module.exports= (req, res) => {
  var pin=generateRandomNumber();
    var con = mysql.createConnection({
      host: 'db4free.net',
      user: 'wahid123',
      password: '12345678',
      database: 'database3021',
        });
      con.connect()
    var data=req.body;
      con.query(`insert into user(name,email,Gender,Age,password,pin,avatar) values(
      '${data.name}','${data.email}','Male',30,'${data.password}',${pin},'${data.avatar}'
          )`, (err, rows, fields) => {
        if (err) throw err
        sendpin(pin,data.email);
        res.send("User Inserted")
      })
      con.end()
  }
