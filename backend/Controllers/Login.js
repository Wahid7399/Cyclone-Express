const { Sequelize, QueryTypes } = require('sequelize');

module.exports = async function (req, res) {
  const sequelize = new Sequelize('web', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  if (req.body.person == "User") {

    const records = await sequelize.query('select * from user where Email="' + req.body.email + '" and password="' + req.body.password + '"', {
      nest: true,
      type: QueryTypes.SELECT
    });
    if (records.length != 0) {
      req.session.user = { email: req.body.email, id: records[0].ID, avatar: records[0].avatar, admin: false };
      res.send({ found: true, id: records[0].ID,email: req.body.email ,avatar: records[0].avatar, admin: false })
    
    } else
      res.send({ found: false })
  }
  else {
    const records = await sequelize.query('select * from admin where email="' + req.body.email + '" and password="' + req.body.password + '"', {
      nest: true,
      type: QueryTypes.SELECT
    });
    if (records.length != 0) {
      req.session.user = { email: req.body.email, id: records[0].ID, avatar: records[0].avatar, admin: true };
      res.send({ found: true, email: req.body.email,id: records[0].id, avatar: records[0].avatar, admin: true })
    } else
      res.send({ found: false })
  }

}