const Admin = require("../models/adminModel")

async function createUser(req, res){
    try {
        const {adminEmail} = req.params
        const {email, password, phone, department}  = req.body

        const isExists = await Admin.exists({email: adminEmail})
        if(!isExists) return res.status(422).send("Invalid Admin")

        let adminDoc = await Admin.findOneAndUpdate(
            {email: adminEmail, "users.email": {$nin: [email]}},
            {
                $push: {
                    "users": {email, password, phone, department}
                }
            },
            {returnDocument: "after"}
        )

        if(!adminDoc) return res.status(422).send("User Already Exits") 

        adminDoc = adminDoc.toObject()
        delete adminDoc.password
        
        res.send(adminDoc)
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong...");
    }
}

exports.createUser = createUser