const { fn, col, literal } = require('sequelize');
const User = require('../models/User.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.GetUserById = async (id,attr) => await User.findByPk(id,{...attr})



module.exports.GetAllUsers = async (attr) => await User.findAll({ ...attr })

module.exports.GetUserByEmail = async (email) => await User.findOne({ where: { email: email } })

module.exports.CreateUser = async (user) => {
    user.password = await bcrypt.hash(user.password.toString(), saltRounds)
    const newuser = await User.create(user)
    return newuser
}

// module.exports.UpdateUser = async (id, user) => {
//     user.password = await bcrypt.hash(user.password.toString(), saltRounds)
//     const updateduser = await User.update(user, { where: { id: id } })
//     return updateduser

// }

module.exports.DeleteUser = async (id) => await User.destroy({ where: { id: id } })

module.exports.UserCount = async () => await User.count()

