const express = require("express");
const Users = require("../models/userModel")

const friendsRouter = express.Router();

const getFriendById = async id => {
    const result = await Friend.findByPk(id);
    return JSON.parse(JSON.stringify(result));
};


friendsRouter
    .get("/:userid", async(req, res) => {
        const { id } = req.params;
        const requiredFriend = await getFriendById(parseInt(id));
        if (requiredFriend) {
            res.status(200).json({ data: requiredFriend });
        } else {
            res.status(400).send("Friends unavailable");
        }
    })
    .post("/login", async(request, response) => {
        try {
            const { email, password } = request.body;
            const result = await getUser(email);
            if (result) {
                const isValidPassword = compareHash(password, result[0].password);
                if (isValidPassword) {
                    const token = sign({
                        sub: "user",
                        email
                    });
                    //response.cookie("jwt", token, { httpOnly: true });
                    response.status(200).json({
                        message: "Valid user!!"
                    });
                } else {
                    response.status(400).send("Invalid User");
                }
            } else {
                response.status(400).send("Invalid User");
            }
        } catch (e) {
            response.status(400).send(e);
        }
    })
    .post("/", async(req, res) => {
        try {
            if (req.body.firstName) {
                const result = await Users.create(req.body);
                console.log(result.get());
                res.status(200).json({
                    message: "Users added Successfully",
                    data: result.get()
                });
            } else {
                res.status(400).send("Invalid Users");
            }
        } catch (e) {
            res.status(500).send("Internal Server Error");
        }
    })
    .put("/", (req, res) => {})

module.exports = {
    friendsRouter,
    getFriendById
};