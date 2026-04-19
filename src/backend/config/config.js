require('dotenv').config()
const path = require('path')

module.exports = {
    development:{
        dialect: process.env.DB_DIALECT,
        storage: path.join(__dirname,'..', process.env.DB_STORAGE)
    },

    test:{
        dialect: process.env.DB_DIALECT,
        storage: path.join(__dirname,'..', process.env.DB_STORAGE)
    },

    production:{
        dialect: process.env.DB_DIALECT,
        storage: path.join(__dirname,'..', process.env.DB_STORAGE)
    }
}