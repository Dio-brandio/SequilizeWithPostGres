
const Role = require('../app/models/Role.model');
const Permission = require('../app/models/Permission.model');
const RolePermission = require('../app/models/RolePermission.model');


async function SeedDB() {
    await SeedRolesAndPermission()
}

async function SeedRolesAndPermission() {
    const ROLES = [{ name: 'Admin' }, { name: 'User' }, { name: 'Viewer' }]
    const PERMISSIONS = [{ name: 'Update' }, { name: 'Ownupdate' }, { name: 'View' }]
    const roles = await Role.count()
    const permissions = await Permission.count()
    if (roles === 0 && permissions === 0) {
        const SeededRoles = await Role.bulkCreate(ROLES)
        const SeededPermissions = await Permission.bulkCreate(PERMISSIONS)
        const RolesAndPermission = [
            {
                roleid: SeededRoles[0].id,
                permissionid: SeededPermissions[0].id,
            },
            {
                roleid: SeededRoles[1].id,
                permissionid: SeededPermissions[1].id,
            },
            {
                roleid: SeededRoles[2].id,
                permissionid: SeededPermissions[2].id,
            }
        ]
        await RolePermission.bulkCreate(RolesAndPermission)
    }
}
module.exports = { SeedDB }