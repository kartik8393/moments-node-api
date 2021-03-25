const jwt = require('jsonwebtoken');
const  { successResponse,errorResponse } = require('../helper/index');

module.exports = function (req, res, next) {
    const token = req.header('token');
    if (!token) return errorResponse(req, res, "No token found", 401);

    try {
        const verified = jwt.verify(token,"TOKENSECRET");
        req.user = verified;
        next();
    } catch (err) {
        errorResponse(req, res, "Invalid Token", 401, err);
    }
}
