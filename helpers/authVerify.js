const { tokenValidator } = require('./token');


const authVerify = (req, res, next) => {
    // console.log("REQ = ",req)
    try {
        const authHeader = req.headers['authorization'];
        // console.log("AUthHeader - ",authHeader)
        if(!authHeader) return res.status(401).json('Header is Required')
        const token = authHeader.split(' ')[1];
        // console.log("USers Token = ",token)
        const isValid = tokenValidator(token);
        if (isValid) {
            next();
        } else {
            res.status(400).json('Access Denied')
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = authVerify;