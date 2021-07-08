const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('config');

exports.register = (req, res) => {
    const body = req.body;

    User.create({
            username: body.username,
            email: body.email,
            password: body.password,
            firstname: body.firstname,
            lastname: body.lastname,
            phonenumber: body.phonenumber
        })
        .then((data) => {
            return res.status(200).send({
                status: 'Success',
                message: "User Registered Successfully!",
                data: data
            });
        })
        .catch((err) => {
            return res.status(500).send({
                status: 'Error',
                message: `Server Error: ${err}`
            })
        });
};

exports.login = (req, res) => {
    User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    .then(async(data) => {
        if (!data) {
            return res.status(400).send({
                status: 'Success',
                message: 'Invalid username and / or password'
            });
        }

        const token = await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: data._id
          }, config.get('jwtsecret'));

        return res.send({
            status: 'Success',
            message: 'User logged in successfully',
            data: token
        })
    })
    .catch((err) => {
        return res.status(500).send({
            status: 'Error',
            message: `Server Error: ${err}`
        })
    });
};