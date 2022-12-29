const { login } = require("../controllers/login")
const { register } = require("../controllers/register")

const router = require("express").Router()


router.post('/register', register)
router.post('/login', login)

module.exports = router