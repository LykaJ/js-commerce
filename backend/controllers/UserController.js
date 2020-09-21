const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.user = (req, res) => {
    User.findOne({userId: req.body._id})
        .then(user => res.status(200).json({
            user
        }))
        .catch(error => res.status(400).json({error}))
};

exports.userList = (req, res) => {
    User.find()
        .then(users => res.status(200).json({users}))
        .catch(error => res.status(400).json({error}))
};

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                firstLogin: Date.now(),
                isTokenBlacklisted: false
            })
            user.save()
                .then(() => res.status(201).json({
                    message: 'User created',
                }))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'User not found'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'invalid credentials'});
                    }
                    User.updateOne({email: req.body.email}, {
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: 18000},

                        ),
                        lastLogin: Date.now(),
                        isTokenBlacklisted: false
                    })
                        .then(user => res.status(200).json({user}), {runValidators: true})
                        .catch(error => res.status(400).json({error}));
                })

        })
        .catch(error => res.status(500).json({error}));
};

exports.logout = (req, res) => {
    User.updateOne({userId: req.body._id}, {
        token: null,
        isTokenBlacklisted: true
    })
        .then(user => res.status(200).json({user}), {runValidators: true})
        .catch(error => res.status(500).json({error, message: "Cannot logout"}));
};