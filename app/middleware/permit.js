const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../constraints/response-codes")

const permit = {
    IsUser: (req, res, next) => {
        try {
            const tokendata = checkToken(req.loggeduser.permissionstoken ?? null)

            if (!tokendata.ok) {
                return res.status(Unauthorized.code).json({ message: Unauthorized.message, ok: false })
            }
            if (tokendata.data && !tokendata.data.permissions.includes('ViewOwnInformation')) {
                return res.status(Unauthorized.code).json({ message: Unauthorized.message, ok: false })
            }
            next()
        } catch (error) {
            return res.status(Unauthorized.code).json({ message: Unauthorized.message, ok: false })
        }

    },
    IsAdmin: (req, res, next) => {
        try {
            const tokendata = checkToken(req.loggeduser.permissionstoken ?? null)

            if (!tokendata.ok) {
                return res.status(Unauthorized.code).json({ message: Unauthorized.message, ok: false })
            }
            if (tokendata.data && !tokendata.data.permissions.includes('ViewOwnInformation')) {
                return res.status(Unauthorized.code).json({ message: Unauthorized.message, ok: false })
            }
            next()
        } catch (error) {
            return res.status(Unauthorized.code).json({ message: Unauthorized.message, ok: false })
        }

    }
}

function checkToken(token) {

    if (token && !token || token === undefined || token === null) {
        return { ok: false }
    }
    const data =jwt.verify(token, process.env.JWT_SECRET)
    return { ok: true, data }
}
module.exports = permit
