const mongoose = require("mongoose")

const Schema = mongoose.Schema

const departmentSchema = new Schema({
    departments: [
        {
            name: String,
            code: Number
        }
    ]
})

const Department = mongoose.model("Department", departmentSchema, "departments")

module.exports = Department