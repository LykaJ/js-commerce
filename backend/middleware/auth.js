const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }

        User.findOne({id: userId})
            .then(user => {
                if (user.isTokenBlacklisted === true) {
                    res.status(401).json({message: 'Access Denied'});
                }
            })
            .catch(error => {res.status(500).json({error})});

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};