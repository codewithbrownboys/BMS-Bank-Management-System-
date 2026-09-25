const userModel = require("../models/account.model/account.model");


async function createAccountController(req,res){
    const user = req.user;

    const account = userModel.create({
        user: user._id
    })

    res.status(201).json({
        account
    })

}

module.export = {
};