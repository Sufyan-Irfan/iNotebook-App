const jwt = require("jsonwebtoken")
const jwt_secret = 'Sm@rtboy'

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, jwt_secret)
        req.user = data.user
        next()
        
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
}
module.exports = fetchuser