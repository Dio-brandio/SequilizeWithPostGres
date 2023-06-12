const { DataTypes } = require("sequelize");
const connection = require("../../config/db.config");
        
const Exercise = connection.define('Exercise', {
  // Model attributes are defined here
  exerciseid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bodypart:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  equipment:{
    type: DataTypes.STRING,
    allowNull: false
  },
  gifurl:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsL0UtA7cbm9S9q-E2nKdJoVbMENyKGBcMgEFx49BXysiKOE6m1cUXDl7VNCr0g0gKCB3r6DAZ0dg&ec=48665701"
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  target:{
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Other model options go here
  timestamps: true,
  freezeTableName: true,
});
// Exercise.sync().then(()=>{
//   console.info("The table for the Exercise model was just (re)created!");
// });
module.exports = Exercise
