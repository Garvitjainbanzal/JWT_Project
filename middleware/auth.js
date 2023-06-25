const CustomApiErrors = require('../errors/custom-errors');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomApiErrors('No Token Provided', 401)
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new CustomApiErrors('Not Authorized to access this route', 401)
    }
}

module.exports = authenticationMiddleware;