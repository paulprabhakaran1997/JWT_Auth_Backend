const jwt = require('jsonwebtoken');

const tokenGenerator = (email) =>{
    const token = jwt.sign(
            {email : email}, 
            process.env.ACCESS_KEY,
            {expiresIn : "3h"}
        )

    return token
}

const tokenValidator = (token) =>{
    try {
        const data = jwt.verify(token, process.env.ACCESS_KEY);
        return data
    } catch (error) {
        return false
    }
}

module.exports.tokenGenerator = tokenGenerator;
module.exports.tokenValidator = tokenValidator;