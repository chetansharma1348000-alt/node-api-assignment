const mongoose = require("mongoose");

const onlyLettersRegex = /^[A-Za-z\s]+$/;

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            match: [
                onlyLettersRegex,
                "First name must contain letters only"
            ]
        },

        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            match: [
                onlyLettersRegex,
                "Last name must contain letters only"
            ]
        },

        mobile: {
            type: String,
            required: [true, "Mobile number is required"],
            match: [
                /^[0-9]{10}$/,
                "Mobile number must be exactly 10 digits"
            ]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        address: {
            street: {
                type: String,
                required: [true, "Street is required"],
                trim: true
            },

            city: {
                type: String,
                required: [true, "City is required"],
                trim: true,
                match: [
                    onlyLettersRegex,
                    "City must contain letters only"
                ]
            },

            state: {
                type: String,
                required: [true, "State is required"],
                trim: true,
                match: [
                    onlyLettersRegex,
                    "State must contain letters only"
                ]
            },

            country: {
                type: String,
                required: [true, "Country is required"],
                trim: true,
                match: [
                    onlyLettersRegex,
                    "Country must contain letters only"
                ]
            }
        },

        loginId: {
            type: String,
            required: [true, "Login ID is required"],
            unique: true,
            trim: true,
            match: [
                /^[A-Za-z0-9]{8}$/,
                "Login ID must be exactly 8 alphanumeric characters"
            ]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [
                6,
                "Password must contain at least 6 characters"
            ],

            validate: {
                validator: function (value) {
                    const passwordRegex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

                    return passwordRegex.test(value);
                },

                message:
                    "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 special character"
            }
        }
    },
    {
        timestamps: {
            createdAt: "creationTime",
            updatedAt: "lastUpdatedOn"
        }
    }
);

module.exports = mongoose.model("User", userSchema);