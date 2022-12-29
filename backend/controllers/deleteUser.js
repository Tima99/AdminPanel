const Admin = require("../models/adminModel")

async function deleteUser(req, res){
    try {
        const { adminEmail , deleteUserEmail} = req.params

        const deleteSucess = await Admin.findOneAndUpdate(
            {email : adminEmail},
            {
                $pull:{
                    users : {email : deleteUserEmail}
                }
            }
        )

        if(!deleteSucess) return res.status(422).send("User not found")

        res.send(deleteSucess)
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong...");
    }
}

exports.deleteUser = deleteUser