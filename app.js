const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());


app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);
app.listen(3000, () => console.log("Server running on port 3000"));
