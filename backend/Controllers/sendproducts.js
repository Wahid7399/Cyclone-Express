const { Sequelize, QueryTypes } = require('sequelize');
const mysql=require("mysql")
let mycount=1;
async function getcount(){
  const sequelize = new Sequelize('database3021', 'wahid123', '12345678', {
    host: 'db4free.net',
    dialect:'mysql' 

  });
   const result1=await sequelize.query("select count(*) as count from product", {
    nest: true,
    type: QueryTypes.SELECT
  })
  sequelize.close();
  mycount=result1[0].count;
  return result1[0].count;
}

module.exports= async function (req,res){
  try {
    
await getcount()
    const sequelize = new Sequelize('database3021', 'wahid123', '12345678', {
      host: 'db4free.net',
      dialect:'mysql' 
    });

  //  const result1=await sequelize.query("select count(*) as count from product", {
  //   nest: true,
  //   type: QueryTypes.SELECT
  // })

  let movieCount = mycount ;

  let page = req.params.page ? req.params.page : 1;
  let moviesPerPage = req.params.moviesPerPage ? req.params.moviesPerPage : 9;
  let startLimit = (page - 1) * moviesPerPage;
  let totalPages = Math.ceil(movieCount / moviesPerPage);

  const records = await sequelize.query(`select *  from product  LIMIT ${startLimit}, ${moviesPerPage}`, {
        nest: true,
        type: QueryTypes.SELECT
      });

      sequelize.close();
    res.send({records,totalPages:totalPages})
  } catch (error) {
    res.send({records:[],totalPages:1})
  }
 }

 
