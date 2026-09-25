const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function useregistercontroller(req, res) {
    try {
        const { email, name, password } = req.body;

        const isExist = await usermodel.findOne({ email: email });

        if (isExist) {
            return res.status(400).json({
                message: "user already exist",
                status: "failed"
            });
        }

        const user = await usermodel.create({ email, name, password });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token);
        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "something went wrong" });
    }
}

async function userlogincontroller(req, res) {
    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                message: "user not found"
            });
        }

        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
            return res.status(401).json({
                message: "invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token);

        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "something went wrong" });
    }
}

module.exports = { useregistercontroller, userlogincontroller };