const User = require("../models/User");


// CREATE USER
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


        const existingUser =
            await User.findOne({ loginId });


        if (existingUser) {

            return res.status(400).json({

                success: false,

                message:
                    "Login ID already exists"

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


        const savedUser =
            await user.save();


        // Password client ko return nahi karenge
        const safeUser =
            savedUser.toObject();

        delete safeUser.password;


        res.status(201).json({

            success: true,

            message:
                "User saved successfully",

            data: safeUser

        });


    } catch (error) {

        console.error(error);


        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


// GET ALL USERS
exports.getUsers = async (req, res) => {

    try {

        const users = await User
            .find()
            .select("-password")
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


// GET SINGLE USER
exports.getUserById = async (req, res) => {

    try {

        const user = await User
            .findById(req.params.id)
            .select("-password");


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }


        res.status(200).json({

            success: true,

            data: user

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            success: false,

            message:
                "Unable to get user details"

        });

    }

};