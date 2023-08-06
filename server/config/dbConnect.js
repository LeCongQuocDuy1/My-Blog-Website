const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        // ready states:
        // 0: disconnected
        // 1: connected
        // 2: connecting
        // 3: disconnecting

        if (connection.connection.readyState === 1) {
            console.log("DB connection is successfully! :>");
        } else {
            console.log("DB connection is failed :<");
        }
    } catch (error) {
        console.log("DB connection is failed :<");
        throw new Error(error);
    }
};

module.exports = dbConnect;
