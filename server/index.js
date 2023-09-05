const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 6969;

// app.use(
//     cors({
//         origin: process.env.CLIENT_URL,
//         methods: ["GET", "POST", "PUT", "DELETE"],
//     })
// );

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cors(
    {
        origin: ["https://my-blog-website-brown.vercel.app/"],
        methods: ["GET", "POST"],
        credentials: true
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "200mb" }));

dbConnect();
initRoutes(app);

app.listen(port, () => {
    console.log("Server running on the port " + port);
});
