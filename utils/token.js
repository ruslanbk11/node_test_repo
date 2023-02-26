const jwt = require("jsonwebtoken");

const generateToken = (user, expiresInDays) => jwt.sign(
    {
        _id: user._id,
        fullName: user._doc.fullName,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: `${expiresInDays}d` }
);

module.exports = {
    generateToken,
}