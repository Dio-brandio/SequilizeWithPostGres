const { DataTypes } = require("sequelize");
const connection = require("../../config/db.config");

const Role = connection.define('Role', {
  // Model attributes are defined here
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }

}, {
  // Other model options go here
  timestamps: true,
  freezeTableName: true,
});


// Role.sync({force:true}).then(()=>{
//   console.info("The table for the Role model was just (re)created!");
// });
// Role.sync().then(() => {
//   console.info("The table for the Role model was just synced!");
// });



module.exports = Role
