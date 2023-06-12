const { OK, InternalServer, BadRequest, EntryCreated } = require("../constraints/response-codes")
const Role = require("../models/Role.model")
const User = require("../models/User.model")

module.exports.GetRoles = async (req, res) => {
    try {
        const roles = await Role.findAll()
        return res.status(OK.code).json({ roles, message: OK.message })
    } catch (err) {
        return res.status(InternalServer.code).json({ message: err.message })

    }
}

module.exports.NewRole = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(BadRequest.code).json({ message:BadRequest.message })
        }
        const role = await Role.create({ name: req.body.name })

        return res.status(EntryCreated.code).json({ role, message:EntryCreated.message })
    } catch (err) {
        return res.status(InternalServer.code).json({ message: err.message })

    }
}