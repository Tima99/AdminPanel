const Admin = require("../models/adminModel");
const saveJWT = require("../utils/saveJWT")

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body

        const adminDoc = await Admin.findOne({email})

        if(!adminDoc) return res.status(422).send("Email not exists")

        const isMatch = await adminDoc.comparePassword(password)

        if(!isMatch) return res.status(422).send("Password wrong")

        await saveJWT({email: adminDoc.email}, res)

        
        let admin = adminDoc.toObject()

        delete admin.password

        res.send(admin)
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong...");
    }
};
