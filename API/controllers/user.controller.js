const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.test = async function(req, res) {
    return res.send('Backend working!');
};