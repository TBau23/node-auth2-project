const router = require('express').Router();
const Users = require("./usersModel.js");
const routeLock = require("../auth/routeLock-mw.js");
const { route } = require('../api/server.js');

router.get("/", routeLock, (req, res) => {
    
    Users.find()
        .then(users => {
            if (users.length === 0) {
                res.json({message: "No users registered currently"})
            } else {
                res.status(200).json(users)
            }
        })
        .catch(err => {
            res.send(err.message);
        })
});



module.exports = router;
