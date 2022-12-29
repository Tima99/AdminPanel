const Admin = require("../models/adminModel")

async function editUser(req, res){
    try {
        const {adminEmail} = req.params
        const {editUserEmail, user}  = req.body
        const {email, password, phone, department} = user

        const isExists = await Admin.exists({email: adminEmail})
        if(!isExists) return res.status(422).send("Invalid Admin")

        let adminDoc = await Admin.findOneAndUpdate(
            {email: adminEmail, "users.email" : editUserEmail},
            {
                $set: {
                    "users.$.email": email,
                    "users.$.password": password,
                    "users.$.department": department,
                    "users.$.phone": phone,
                }
            },
            {  returnDocument: "after"}
        )

        console.log(adminDoc);

        if(!adminDoc) return res.status(422).send("User Already Exits") 

        adminDoc = adminDoc.toObject()
        delete adminDoc.password
        
        res.send(adminDoc)
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong...");
    }
}

exports.editUser = editUser