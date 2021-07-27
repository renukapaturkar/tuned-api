const bcrypt = require('bcryptjs');
const {User} = require('../models/user.model.js');

const findUserByEmail = async(email) => {
    const user = await User.findOne({email});
    return user;
}

const saveNewuserDetails = async({email, name, password}) => {
    const newuser = new User({
        email, name, password
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newuser.password, salt);
    newuser.password = hashedPassword;
    const savedUser = await newuser.save();
    return savedUser;
}

const findUserById = async(userid) => {
    const user = await User.findById(userid);
    return user;
}


module.exports = {findUserByEmail, saveNewuserDetails, findUserById};
