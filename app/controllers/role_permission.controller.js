const { OK, InternalServer, BadRequest, EntryCreated } = require("../constraints/response-codes")
const RolePermission = require("../models/RolePermission.model")

module.exports.GetRolePermission = async (req, res) => {
    try {
        const RolePermission = await RolePermission.findAll()
        return res.status(OK.code).json({ RolePermission, message: OK.message })
    } catch (err) {
        return res.status(InternalServer.code).json({ message: err.message })

    }
}

module.exports.NewRolePermission = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(BadRequest.code).json({ message:BadRequest.message })
        }
        const RolePermission = await RolePermission.create({ Roleid: req.body.Roleid,PermissionId:req.body.PermissionId })
        return res.status(EntryCreated.code).json({ RolePermission, message:EntryCreated.message })
    } catch (err) {
        return res.status(InternalServer.code).json({ message: err.message })

    }
}