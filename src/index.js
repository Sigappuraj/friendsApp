const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const {
    friendsRouter,
    getFriendById
} = require("./routes/friendsRouter")
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});
const ifEquality = require("./views/helpers/ifEquality");
const adminRouter = require("./routes/adminRouter");

const app = express();

// Creating handlebars engine
const hbs = expressHbs.create({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials"),
    helpers: {
        ifEquality
    }
});

// Let express know to use handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.status(200).render("home", {
        layout: "hero",
        title: "Home"
    })
})

app.get("/register", (req, res) => {
    res.status(200).render("addUser.hbs", {
        layout: "adduserform",
        title: "Add User",
        action: "/login",
        method: "POST"
    });
});

app.get("/login", (request, response) => {
    response.status(200).render("userLogin", {
        layout: "login",
        title: "Home",
        action: "/user/login",
        method: "POST"
    });
});

app.get("/friends/:userid", async(request, response) => {
    const { id } = request.params;
    const userFriends = await getFriendById(parseInt(userid));
    //const teachStudents = requiredTeacher.students;
    console.log(userFriends);
    if (userFriends) {
        response.status(200).render("friends.hbs", {
            layout: "userFriends",
            title: "User Friends Details",
            data: userFriends
        });
    } else {
        response.status(400).send("Friends Unavailable");
    }
});


app.use("/user", friendsRouter);
app.use("/login", adminRouter);

app.get("*", (req, res) => {
    res.status(404).send("404 Page not found");
});

app.listen(8080, () => {
    console.log("server running");
});