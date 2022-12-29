const Admin = require("../models/adminModel");

exports.register = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        const isExistAdmin = await Admin.exists({ email })

        if(isExistAdmin) return res.status(422).send("Admin already exists")

        if(password !== confirmPassword) return res.status(422).send("Password not match")

        const adminDoc = new Admin({
            email,
        });

        await adminDoc.hashPassword(password)

        let adminSaved = await adminDoc.save()

        adminSaved = adminSaved.toObject()
        delete adminSaved.password

        res.send(adminSaved);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong...");
    }
};
