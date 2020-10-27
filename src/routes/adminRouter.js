const express = require("express");
const Users = require("../models/userModel");
const { compareHash } = require("../utils/hash");
//const { sign } = require("../utils/jwtService");

const adminRouter = express.Router();

adminRouter.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const result = await Users.findOne({ email });
    const admin = result.get();
    console.log(admin.password)
    if (admin) {
        const isValidPassword = compareHash(password, admin.password);
        if (isValidPassword) {
            message: "Valid Admin!"
                // const token = sign({
                //     sub: "admin",
                //     email
                // });
                // // console.log(token);
                // res.cookie("jwt", token, { httpOnly: true });
                // res.status(200).json({
                //     message: "Valid Admin!"
                // });
        }
        else {
            res.status(401).send("Invalid User");
        }
    } else {
        res.status(401).send("Invalid User");
    }
});

module.exports = adminRouter;