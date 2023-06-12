const { DataTypes } = require("sequelize");
const connection = require("../../config/db.config");

const Permission = connection.define('Permission', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  // Other model options go here
  timestamps: true,
  freezeTableName: true,
});
// Permission.sync({force:true}).then(()=>{
//   console.info("The table for the Permission model was just (re)created!");
// });
// Permission.sync().then(() => {
//   console.info("The table for the Permission model was just synced!");
// });

module.exports = Permission
