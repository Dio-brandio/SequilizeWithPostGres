const { OK, InternalServer, BadRequest, EntryCreated } = require("../constraints/response-codes")
const Permission = require("../models/Permission.model")
const RolePermission = require("../models/RolePermission.model")

module.exports.GetPermissions = async (req, res) => {
    try {
        const Permissions = await Permission.findAll()
        return res.status(OK.code).json({ Permissions, message: OK.message })
    } catch (err) {
        return res.status(InternalServer.code).json({ message: err.message })

    }
}

module.exports.NewPermission = async (req, res) => {
    try {
        if (!req.body || !req.body.roleid) {
            return res.status(BadRequest.code).json({ message: BadRequest.message })
        }
        const permission = await Permission.create({ name: req.body.name })
        const rolesAccordingPermission = req.body.roleid.map((id) => { return { roleid: id, PermissionId: permission.id } })

        await connection.transaction(async function (transaction) {
            const insertRolePermission = await RolePermission.bulkCreate(rolesAccordingPermission,transaction)
            return res.status(EntryCreated.code).json({ insertRolePermission, message: EntryCreated.message })
        })


    } catch (err) {
        return res.status(InternalServer.code).json({ message: err.message })

    }
}