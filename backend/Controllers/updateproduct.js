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
arr.push('/products/'+a.filename)
        }
      })
    var data=req.body;
let str="";
if(req.files.length!=0){
    str+=",avatar = '/products/"+req.files[0].filename+"'";
}

      con.query(`update product set title='${data.title}',	description='${data.description}'	,category ='${data.category}',sprice=${data.sprice},	bprice ='${data.bprice}',quantity='${data.quantity}'`+str+" where id = "+req.params.id
      , (err, rows, fields) => {
        if (err) throw err;
      })
      con.end()
     res.redirect("http://localhost:3000/home")
  }
