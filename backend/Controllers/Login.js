const { Sequelize, QueryTypes } = require('sequelize');

module.exports = async function (req, res) {
  const sequelize =new Sequelize('database3021', 'wahid123', '12345678', {
    host: 'db4free.net',
    dialect:'mysql' 
  });

  if (req.body.person == "User") {

    const records = await sequelize.query('select * from user where Email="' + req.body.email + '" and password="' + req.body.password + '"', {
      nest: true,
      type: QueryTypes.SELECT
    });
    if (records.length != 0) {
      req.session.user = { email: req.body.email, id: records[0].ID, avatar: records[0].avatar, admin: false,verified:records[0].verified };
      res.send({ found: true, id: records[0].ID,email: req.body.email ,avatar: records[0].avatar, admin: false,verified:records[0].verified })
    
    } else
      res.send({ found: false })
  }
  else {
    const records = await sequelize.query('select * from admin where email="' + req.body.email + '" and password="' + req.body.password + '"', {
      nest: true,
      type: QueryTypes.SELECT
    });
    if (records.length != 0) {
      req.session.user = { email: req.body.email, id: records[0].ID, avatar: records[0].avatar, admin: true,verified:records[0].verified };
      res.send({ found: true, email: req.body.email,id: records[0].id, avatar: records[0].avatar, admin: true,verified:records[0].verified })
    } else
      res.send({ found: false })
  }

}