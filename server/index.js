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
    // origin: "*",
    origin: ["https://my-blog-website-brown.vercel.app/"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "200mb" }));

dbConnect();
initRoutes(app);

app.get("/", (req, res) => {
    res.json("Hello world!");
})

app.listen(port, () => {
    console.log("Server running on the port " + port);
});
