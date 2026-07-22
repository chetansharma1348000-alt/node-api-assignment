const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            mobile,
            email,
            street,
            city,
            state,
            country,
            loginId,
            password
        } = req.body;

        const existingUser = await User.findOne({
            loginId: loginId
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Login ID already exists"
            });
        }

        const user = new User({
            firstName,
            lastName,
            mobile,
            email,
            address: {
                street,
                city,
                state,
                country
            },

            loginId,
            password
        });

        const savedUser = await user.save();
        res.status(201).json({
            success: true,
            message: "User saved successfully",
            data: savedUser
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User
            .find()
            .sort({
                creationTime: -1
            });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};