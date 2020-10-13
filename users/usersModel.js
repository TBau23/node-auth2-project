const db = require("../database/connection.js");

module.exports = {
    find, findBy, add, findById
};

function find() {
    return db("users")
        .select("id", "username", "department")
        .orderBy("id")
};

function findById(id) {
    return db("users").where({id}).first();
}

function findBy(filter) {
    return db("users")
        .where(filter)
        .select("id", "username", "password", "department")
        .orderBy("id")
};

function add(user) {
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const id = ids[0];
            return findById(id);
        })
}