const Sequelize = require('sequelize')
const path = require('path')
const db = new Sequelize({
    dialect: `${process.env.DB_DIALECT}`,
    storage: path.join(__dirname,`${process.env.DB_STORAGE}`),
})

module.exports = db



