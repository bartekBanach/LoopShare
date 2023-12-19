const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });

}



const getUser = async (req, res) => {

    const _id = req.params.id;

    try {
        const user = await User.findOne({ _id });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({error: err.message});
    }

}

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        const username = user.username;
        const _id = user._id;

        res.status(200).json({email, username, _id, token});
    } catch (err) {
        console.log('EERROR IN BACKEND', err)
        res.status(400).json({error: err.message});
    }

}


const signup = async (req, res) => {

    const {email, username, password} = req.body;

    try {
        
        const user = await User.signup(email, username, password);
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (err) {
        console.log(err);
        res.status(400).json({error: err.message});
    }

}


module.exports = { getUser, login, signup };