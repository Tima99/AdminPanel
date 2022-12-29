const mongoose = require("mongoose")
const bcrypt   = require("bcrypt")

const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String},
    users: [
        {
            email: {type: String, unique: true},
            phone: String,
            department: String,
            password: String
        }
    ]
}, {timestamps: true})
adminSchema.methods.hashPassword = async function(password){
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        this.password = hash
    } catch (error) {
        console.log(error);
        return Promise.reject(error)   
    }
}

adminSchema.methods.comparePassword = async function(password){
    try {
        const result = await bcrypt.compare(password, this.password)
        // true if match otherwise false

        return result
    } catch (error) {
        console.log(error)
        return Promise.reject(error)   
    }
}
const Admin = mongoose.model("Admin", adminSchema, "admins")

module.exports = Admin