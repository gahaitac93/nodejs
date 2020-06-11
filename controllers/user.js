const models = require("../models");
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        let passwordHash = bcrypt.hashSync(password,10);
        console.log(passwordHash);
        models.User.create({
            name : name,
            email : email,
            password : passwordHash,
            address : address
        }).then(user => {
            if(user) {
                res.redirect('/users/login');
            }
        }).catch(err => console.log(err));

    }catch (e) {
        return res.status(500).send(e.message);
    }
};
module.exports = {
    createUser
};

