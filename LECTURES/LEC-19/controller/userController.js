const user = require("..//model/user");
module.exports.postuser = async(req,res)=>{
    let {email,username,password} = req.body;
    let newUser = new user({
        email:email,
        username:username,
        password:password
    })
    await newUser.save()
    res.json({
        success: true,
        data: newUser,
        message: "User created successfully"
    });
}

module.exports.getAllUsers = async(req,res)=>{
    let allUsers = await user.find();
    res.json({
        success: true,
        data: allUsers
    });
}

module.exports.getUserById = async(req,res)=>{
    let {id} = req.params;
    let userExist = await user.findOne({_id: id}).populate("blogs");
    if(userExist){
        res.json({
        success: true,
        data: userExist
    });
    }
}