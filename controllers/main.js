const CustomApiErrors = require('../errors/custom-errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomApiErrors('Please Provide Username or Password', 400)
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_Secret, { expiresIn: '10d' });
    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports = { login, dashboard };