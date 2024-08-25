const express = require("express");
const { connectMongoDb } = require("./connection");
const app = express();
const path = require("path");
const PORT = 6543;
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const statticRoute = require("./routes/staticRouter");
const { restrictTo, checkForAuthentication } = require("./middlewares/auth");
connectMongoDb("mongodb://localhost:27017/userAuth").then(() =>
  console.log("MongoDb Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Middleware to parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkForAuthentication);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// app.use(express.json());
app.use("/url", userRoute);
app.use("/user", userRoute);
app.get("/home", restrictTo(["NORMAL"]));
app.get("/signup", statticRoute);
app.get("/study", statticRoute);
app.get("/login", statticRoute);

app.listen(PORT, () => console.log(`Server started on : ${PORT}`));
