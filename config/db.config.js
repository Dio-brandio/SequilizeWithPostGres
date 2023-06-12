const Sequelize = require("sequelize");

const connection = new Sequelize(
    process.env.DB_URL,
    {
        dialect: 'postgres',
        protocol: 'postgres',
    }
)

try {
     connection.authenticate()
     connection.sync({alter:true})
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}




module.exports = connection