const { Transaction, fn, col, where, Op } = require("sequelize")
const bcrypt = require("bcrypt")
const StatusCode = require("../constraints/response-codes")
const userservice = require("../service/user.service");
const connection = require("../../config/db.config");
const User = require("../models/User.model");
const Role = require("../models/Role.model");
const Permission = require("../models/Permission.model");
const jwt = require("jsonwebtoken");


async function GetUsers(req, res) {
    try {

        const users = await userservice.GetAllUsers({
            include: {
                model: Role,
                as: "role",
                include: {
                    model: Permission,
                    as: "permissions",
                    through: {
                        attributes: []
                    }
                },
            },
        })
        const userPermissions = await Role.findAll({
            include: {
                model: Permission,
                as: 'permissions',
                attributes: ['name'],
                through: {
                    attributes: []
                },
            },
            as: 'permissions',
            attributes: [["name", "RoleName"]],
        })

        const count = await userservice.UserCount()
        return res.json({ count, users })
    } catch (error) {
        return res.status(StatusCode.InternalServer.code).json({ message: error.message })
    }
}

async function GetUser(req, res) {
    try {
        const userid = Number.parseInt(req.params.userid);
        if (Number.isNaN(userid)) {
            return res.status(StatusCode.BadRequest.code).json({ message: StatusCode.BadRequest.message })
        }
        const user = await userservice.GetUserById(userid);
        if (user === null || user === undefined) {
            return res.status(StatusCode.ResourceNotFound.code).json({ message: StatusCode.ResourceNotFound.message })
        }

        return res.status(StatusCode.OK.code).json(user)
    } catch (error) {
        return res.status(StatusCode.InternalServer.code).json({ message: error.message })

    }
}

async function UpdateUser(req, res) {
    try {
        const userid = Number.parseInt(req.params.userid);
        if (Number.isNaN(userid)) {
            return res.status(StatusCode.BadRequest.code).json({ message: StatusCode.BadRequest.message })
        }

        const user = await userservice.GetUserById(userid);
        if (user === null || user === undefined) {
            return res.status(StatusCode.ResourceNotFound.code).json({ message: StatusCode.ResourceNotFound.message })
        }

        await connection.transaction(async function (transaction) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password.toString(), 10)
            }
            if (req.body.role_id) {
                const userPermissions = await Role.findAll({
                    include: {
                        model: Permission,
                        as: 'permissions',
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    },
                    as: 'permissions',
                    where: {
                        id: {
                            [Op.or]: [req.body.role_id]
                        }
                    },
                    attributes: [["name", "RoleName"]]
                })
                const permisionPayload = userPermissions[0].permissions.map((e) => e.name)
                req.body.token = jwt.sign({ permissions: permisionPayload }, process.env.JWT_SECRET)
            }
            const updateduser = await User.update(req.body, { where: { id: userid } }, transaction)
            if (updateduser !== null && updateduser) {
                return res.status(StatusCode.OK.code).json({ message: StatusCode.OK.message })
            } else {
                return res.status(StatusCode.InternalServer.code).json({ message: error.message })
            }
        })

    } catch (error) {
        // return res.status(StatusCode.InternalServer.code).json({ message: error.message })
        console.log(error.message);

    }
}
async function DeleteUser(req, res) {
    try {
        const userid = Number.parseInt(req.params.userid);
        if (Number.isNaN(userid)) {
            return res.status(StatusCode.BadRequest.code).json({ message: StatusCode.BadRequest.message })
        }
        const user = await userservice.GetUserById(userid);
        if (user && user === null) {
            return res.status(StatusCode.ResourceNotFound.code).json({ message: StatusCode.ResourceNotFound.message })
        }
        await connection.transaction(async function (transaction) {
            await userservice.DeleteUser(userid)
            return res.status(StatusCode.OK.code).json({ message: StatusCode.OK.message })
        })

    } catch (error) {
        return res.status(StatusCode.InternalServer.code).json({ message: error.message })
    }
}
async function NewUser(req, res) {
    try {
        const { email, password, role_id } = req.body;
        if (!req.body || !email || !password || !role_id) {
            return res.status(StatusCode.BadRequest.code).json({ message: StatusCode.BadRequest.message })
        }
        const user = await userservice.GetUserByEmail(email);
        if (user && user !== null) {
            return res.status(StatusCode.BadRequest.code).json({ message: StatusCode.BadRequest.message })
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const userPermissions = await Role.findAll({
            include: {
                model: Permission,
                as: 'permissions',
                attributes: ['name'],
                through: {
                    attributes: []
                }
            },
            as: 'permissions',
            where: {
                id: role_id
            },
            attributes: [["name", "RoleName"]]
        })
        const permisionPayload = userPermissions[0].permissions.map((e) => e.name)
        req.body.token = jwt.sign({ permissions: permisionPayload }, process.env.JWT_SECRET)
        await connection.transaction(async function (transaction) {

            const newUser = await User.create(req.body, transaction)
            return res.status(StatusCode.EntryCreated.code).json({ message: StatusCode.EntryCreated.message, newUser })
        })


    } catch (error) {
        return res.status(StatusCode.InternalServer.code).json({ message: error.message })

    }
}

async function GetProfile(req, res) {
    try {
        if (!req.loggeduser || req.loggeduser == undefined || req.loggeduser === null) {
            return res.status(StatusCode.Unauthorized.code).json({ message: StatusCode.Unauthorized.message, ok: false })
        }

        const profile = await userservice.GetUserById(req.loggeduser.userid, { attributes: { exclude: ['id', "password", "token", "updatedAt", "role_id"] } })
        return res.status(StatusCode.OK.code).json({ profile, ok: true })
    } catch (error) {
        return res.status(StatusCode.InternalServer.code).json({ message: StatusCode.InternalServer.message, error: error.message, ok: false })
    }
}

module.exports = { GetUsers, GetUser, UpdateUser, DeleteUser, NewUser, GetProfile }