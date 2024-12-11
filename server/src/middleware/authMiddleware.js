
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email', 'role', 'is_blocked']
            });

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized, user not found' });
            }

            if (user.is_blocked) {
                return res.status(403).json({ message: 'The user has been blocked' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Unauthorized, token error' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized, missing token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have sufficient rights to perform this action' });
        }
        next();
    };
};

module.exports = { protect, authorize };
