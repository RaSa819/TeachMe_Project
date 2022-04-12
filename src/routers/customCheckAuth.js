import jwt from 'jsonwebtoken'
import config from '../config'

module.exports = (req, res, next) => {
    try {
        const [,token] = req.headers.authorization.split(' ');
        const decoded = jwt.verify(token, config.jwtSecret);
        req.decoded = decoded;
        next();
    } catch (err) {
        return res.status(401).json({error: "Auth failed"});
    }
};