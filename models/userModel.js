const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.statics.signup = async function (email, username, password) {

    if (!email || !username || !password) {
        throw Error('All fields must be filled.');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.');
    }
    if (!validator.isStrongPassword(password, {minUppercase: 0})) {
        throw Error('Password too weak. Password must have minimum 8 characters including one special character.');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already in use.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = this.create({ email, username, password: hash });

    return user;
};

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled.');
    }  
    const user = await this.findOne({ email });  
    if (!user) {
        throw Error('User does not exists.');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password.');
    }

    return user;

}

module.exports = mongoose.model('User', userSchema);
