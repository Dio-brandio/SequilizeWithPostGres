const { DataTypes } = require("sequelize");
const connection = require("../../config/db.config");
const Permission = require("./Permission.model");
const Role = require("./Role.model");

const RolePermission = connection.define('RolePermission', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }

}, {
    // Other model options go here
    timestamps: true,
    freezeTableName: true,
});

Role.belongsToMany(Permission, { as: "permissions", through: RolePermission })
Permission.belongsToMany(Role, { as: "roles", through: RolePermission })

// RolePermission.sync({ force: true }).then(() => {
//     console.info("The table for the RolePermission model was just (re)created!");
// });
// RolePermission.sync().then(() => {
//     console.info("The table for the RolePermission model was just synced!");
// });

module.exports = RolePermission
