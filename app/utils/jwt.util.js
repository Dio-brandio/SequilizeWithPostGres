const jwt = require('jsonwebtoken')

module.exports.createToken = (data)=>{
    const token =jwt.sign(data,process.env.JWT_SECRET,{ expiresIn: '1h'  })
    return token
}


module.exports.decodeToken = (token)=>{
    const  data= jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
        if (err) {
            throw err
        }
    })
    return data
}
