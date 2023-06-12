const jwt = require('jsonwebtoken');
const StatusCode = require("../constraints/response-codes");
const { decodeToken } = require('../utils/jwt.util');


async function CheckCookie(req, res, next) {

    const token = req.cookies.authtoken
    if (!token || token === undefined || token === null) {
        return res.status(StatusCode.BadRequest.code).json({ message: StatusCode.BadRequest.message, ok: false })
    }

    // const verifyToken = decodeToken(token).catch(()=> res.status(StatusCode.Unauthorized.code).json({ message: StatusCode.Unauthorized.message, ok: false }) )
    jwt.verify(token, process.env.JWT_SECRET, (err, userdata) => {
        if (err) {
            return res.status(StatusCode.Unauthorized.code).json({ message: StatusCode.Unauthorized.message, ok: false })
        } else {
            req.loggeduser = userdata
            next()
        }
    })
}



module.exports = { CheckCookie }