const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        let user = User.findOne({id: userId});

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else if (user.isTokenBlacklisted === true) {
            return res.status(401).json({
                error: new Error('Access Denied')
            });
        } else if ( decodedToken.exp * 1000 < Date.now()) {
            return res.redirect('/logout');
        }
        else {
            next();
        }

    } catch {
        return res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};