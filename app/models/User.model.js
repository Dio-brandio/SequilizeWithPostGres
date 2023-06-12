const { DataTypes } = require("sequelize");
const connection = require("../../config/db.config");
const Role = require("./Role.model");

const User = connection.define('User', {
  // Model attributes are defined here

  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  // Other model options go here
  timestamps: true,
  freezeTableName: true,
});

Role.hasMany(User, { as: "users",foreignKey: "role_id"})
User.belongsTo(Role ,{as:"role",foreignKey: "role_id"})

// User.sync({force:true}).then(()=>{
//   console.info("The table for the User model was just (re)created!");
// });
// User.sync().then(() => {
//   console.info("The table for the User model was just synced!");
// });

module.exports = User
