var mysql = require('mysql');

module.exports= async (req, res) => {
 
    var con = mysql.createConnection({
      host: 'db4free.net',
      user: 'wahid123',
      password: '12345678',
      database: 'database3021',
        });
      con.connect()
      var arr=[]
     await req.files.map((a,i)=>{
        if(i!=0){
arr.push(a.filename)
        }
      })
    var data=req.body;
      con.query(`insert into product(title,	description	,category,sprice,	bprice,	quantity,avatar,images) values(
      '${data.title}','${data.description}','${data.category}',${data.sprice},'${data.bprice}','${data.quantity}','${req.files[0].filename}','${JSON.stringify(arr)}'
          )`, (err, rows, fields) => {
        if (err) throw err;
      })
      con.end()
     res.redirect("http://localhost:3000/home")
  }
