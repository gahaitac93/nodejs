const models = require("../models");
const bcrypt = require('bcryptjs');

const registerUser  = async (req, res) => {
    try {
        res.render('register');
    }catch (e) {
        res.send(e.message);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        let passwordHash = bcrypt.hashSync(password,10);

        models.User.create({
            name : name,
            email : email,
            password : passwordHash,
            address : address
        }).then(user => {
            if(user) {
                res.redirect('/login');
            }
        }).catch(err => console.log(err));

    }catch (e) {
        return res.status(500).send(e.message);
    }
};

const listUsers = async (req, res) => {
    try {
        let users = await models.User.findAll();
        res.render('users/list',{
            users: users,
            success: req.session.success, errors: req.session.errors
        });
    }catch (e) {
        return res.send(e.message);
    }
};

const updateUser = async (req, res) => {
    try {
        let id = req.body.id;
        const update = await models.User.update(req.body,{
            where : {
                id : id
            }
        });
        if(update) {
            res.redirect('/');
        }
        throw new Error("Post not found");


    }catch (e) {
        console.log(e.message);

    }

};
module.exports = {
    createUser,
    listUsers,
    updateUser,
    registerUser
};

