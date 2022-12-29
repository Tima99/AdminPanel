const Department = require("../models/departmentsModel")

const router = require("express").Router()


router.get('/departments', async (req, res) => {
    try {
        const departments = await Department.findOne({}) 

        res.send(departments)
    } catch (error) {
        
    }
})

module.exports = router