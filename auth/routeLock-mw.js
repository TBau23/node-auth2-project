const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../api/config.js");;

module.exports =  (req,res,next) => {
        const token = req.headers.authorization;
        // this MW will be looking for the token in the request header key called 'authorization'

        if(token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({message: "Invalid Token"})
                } else {
                    // token is valid
                    // not sure what this line does
                    req.jwt = decodedToken;
                    next();
                }
            })
        } else {
            res.status(401).json({get: "lost squeeb!"});
        }
    };