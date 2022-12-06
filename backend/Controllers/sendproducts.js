const { Sequelize, QueryTypes } = require('sequelize');


module.exports= async function (req,res){
    const sequelize = new Sequelize('database3021', 'wahid123', '12345678', {
      host: 'db4free.net',
      dialect:'mysql' 
    });
   const result=await sequelize.query("select count(*) as count from product", {
    nest: true,
    type: QueryTypes.SELECT
  })

  let movieCount = result[0].count  ;
  let page = req.params.page ? req.params.page : 1;
  let moviesPerPage = req.params.moviesPerPage ? req.params.moviesPerPage : 9;
  let startLimit = (page - 1) * moviesPerPage;
  let totalPages = Math.ceil(movieCount / moviesPerPage);

  const records = await sequelize.query(`select *  from product  LIMIT ${startLimit}, ${moviesPerPage}`, {
        nest: true,
        type: QueryTypes.SELECT
      });

      
    res.send({records,totalPages:totalPages})
 }