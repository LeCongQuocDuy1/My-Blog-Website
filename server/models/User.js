const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default:
                "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png",
        },
        role: {
            type: String,
            default: "user",
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
