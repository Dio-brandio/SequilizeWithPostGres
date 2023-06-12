const StatusCode = require("../constraints/response-codes")
const bcrypt =require('bcrypt')

const userservice = require("../service/user.service")
const  {createToken}= require("../utils/jwt.util")
const Role = require("../models/Role.model")

async function Authenticate(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password || !req.body) {
            return res.status(StatusCode.BadRequest.code).json({ message:StatusCode.BadRequest.message, ok: false })
        }
        const IsUser = await userservice.GetUserByEmail(email);

        if (IsUser === null) {
            return res.status(StatusCode.BadRequest.code).json({ message:StatusCode.BadRequest.message, ok: false })
        }

        const IsCorrectPassword = await bcrypt.compare(password.toString(), IsUser.password.toString());

        if (!IsCorrectPassword) {
            return res.status(StatusCode.BadRequest.code).json({ message:StatusCode.BadRequest.message, ok: false });
        }

        const userCredentials = {
            email: IsUser.email,
            userid: IsUser.id,
            name: IsUser.name,
            permissionstoken: IsUser.token
        }

        const token = createToken(userCredentials);
        console.log(token);
        res.cookie("authtoken", token)  
        return res.status(StatusCode.OK.code).json({ token, ok: true });

    } catch (error) {
        return res.status(StatusCode.InternalServer.code).json({ message: error.message, ok: false });
    }


}


async function RegisterUser(req, res) {
    try {
        
        const { email } = req.body

        if (!email || !req.body) {
            return res.status(StatusCode.BadRequest.code).json({ message: "Badrequest", ok: false })
        }

        const IsUser = await userservice.GetUserByEmail(email);

        if (IsUser !== null) {
            return res.status(StatusCode.BadRequest.code).json({ message:"Email cant be used", ok: false })
        }

         await userservice.CreateUser(req.body)
        return res.status(StatusCode.EntryCreated.code).json({ message:"Registered Succesffully", ok: true });

    } catch (error) {
        return res.status(StatusCode.InternalServer.code).json({ message: error.message, ok: false });

    }
}

module.exports = { Authenticate, RegisterUser }