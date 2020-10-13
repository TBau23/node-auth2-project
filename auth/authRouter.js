const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/usersModel.js");
const { jwtSecret } = require("../api/config.js");
const { isValid } = require("../users/userValidation.js");


router.post("/register", (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }

});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({username})
            .then(users => {
                const user = users[0];

                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = getJwt(user);
                }
            })
    }
})

function getJwt(user) {
    const payload = {
        username: user.username,
        department: user.department
    }

    const jwtOptions = {
        expiresIn: "8h"
    }

    return jwt.sign(payload, jwtSecret, jwtOptions);
}

module.exports = router;
