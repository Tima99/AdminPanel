const dotenv = require("dotenv")

dotenv.config()

module.exports = {
    PORT,
    DB_URL,
    SECRET_KEY
} = process.env
