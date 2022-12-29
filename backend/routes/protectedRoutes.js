const { editUser } = require("../controllers/editUser")
const { createUser } = require("../controllers/createUser")
const { deleteUser } = require("../controllers/deleteUser")

const router = require("express").Router()

router.post('/createUser/:adminEmail', createUser)
router.post('/editUser/:adminEmail', editUser)

router.get(`/delete/:adminEmail/:deleteUserEmail`, deleteUser)

module.exports = router