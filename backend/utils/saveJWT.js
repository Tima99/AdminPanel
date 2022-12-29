const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
function saveJWT(payload, res){
    try {
        const expiresIn = "10h" 
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn})
        // console.log(token);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false
        })
    } catch (error) {
        // console.log(error)
        return Promise.reject(error)
    }
}

module.exports = saveJWT