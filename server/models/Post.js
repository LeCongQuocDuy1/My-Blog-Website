const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        image: {
            type: String,
            default:
                "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("Post", postSchema);
