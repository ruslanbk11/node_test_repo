const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const { generateToken } = require("../utils/token");

const register = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json(errors.array())
        }

        const { login, fullName, password } = request.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            login,
            fullName,
            passwordHash,
        });
        const result = await newUser.save();

        const token = generateToken(result, 30);

        response.json({
            ...result._doc,
            token,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: 'Registration failed',
        })
    }
};

const authorize = async (request, response) => {
    try {
        const { login, password } = request.body;
        const user = await User.findOne({ login });
        const isValidPassword = await bcrypt.compare(password, user._doc.passwordHash);

        if ( !user || !isValidPassword ) {
            return response.status(404).json({
                error: 'Authorization failed',
            })
        }

        const token = generateToken(user, 30);

        response.json({
            ...user._doc,
            token,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: 'Authorization failed',
        })
    }
};

const getUserInfo = async (request, response) => {
    try {
        const user = await User.findById(request.userId);

        if ( !user ) {
            return response.status(404).json({
                error: 'User is not found',
            })
        }

        response.json(user._doc);
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: 'Get user info failed',
        })
    }
}

module.exports = {
    register,
    authorize,
    getUserInfo,
}