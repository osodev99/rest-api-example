const { Sequelize } = require('sequelize');

const sequelizeConn = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// try {
//     await sequelizeConn.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

module.exports = sequelizeConn;