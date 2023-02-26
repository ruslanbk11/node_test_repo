const jwt = require("jsonwebtoken");

const checkAuthorization = (request, response, next) => {
    const token = request.headers.authorization || '';
    if ( !token ) {
        return response.status(403).json({
            error: 'Unauthorized',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        request.userId = decoded._id;
        next();
    } catch (error) {
        console.log(error);
        response.status(403).json({
            error: 'Unauthorized',
        })
    }
}

module.exports = checkAuthorization;