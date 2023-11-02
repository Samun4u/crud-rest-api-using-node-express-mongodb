const User = require("../models/user");


async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    return res.status(200).json(allDbUsers);
}

async function handleCreateNewUser(req,res){
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ){
        return res.status(400).json({
            msg: "All fields are required"
        })
    }

    const result = await User.create({
        firstName : body.first_name,
        lastName : body.lastName,
        email : body.email,
        gender : body.gender,
        jobTitle : body.jobTitle,
    });

    console.log("result",result);

    return res.status(201).json({
        msg: "User Created Success"
    });
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({error: "User not found"});
    }
    return res.status(200).json(user);
}

async function handleUpdateUserById(req,res){
    const user = await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json(user)
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json("Delete success")
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}