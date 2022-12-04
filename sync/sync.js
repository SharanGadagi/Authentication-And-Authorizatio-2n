require('../connection/db');
const db={};
  db.sequelize=sequelize;
  db.Sequelize=Sequelize,


 db.user= require('../models/user')(sequelize,DataTypes);
db.sequelize.sync({force:true});

  module.exports=db;