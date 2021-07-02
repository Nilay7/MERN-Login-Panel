const router = require('express').Router();
const {
    check
} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/signup',
    check('email')
    .isEmail()
    .withMessage('enter valid email address'),
    check('username')
    .isLength({
        min: 6
    })
    .withMessage('must be at least 6 chars long'),
    check('password')
    .isLength({
        min: 6
    })
    .withMessage('must be at least 6 chars long'),
    check('firstname')
    .isLength({
        min: 1
    })
    .withMessage('please enter First Name'),
    check('lastname')
    .isLength({
        min: 1
    })
    .withMessage('please enter Last Name'),
    check('phonenumber')
    .isLength({
        min: 10
    })
    .withMessage('please enter valid number'),
    userController.register);

router.post('/login',
    check('username')
    .isLength({
        min: 6
    })
    .withMessage('enter valid username'),
    check('password')
    .isLength({
        min: 6
    })
    .withMessage('enter valid password'),
    userController.login);

module.exports = router;