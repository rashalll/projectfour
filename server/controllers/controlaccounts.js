const Accounts = require('../model/accountsModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "24h" })
}


exports.signUp = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    try {

        const user = await Accounts.signUp(first_name, last_name, email, password)
        res.status(200).json({ message: "Account Created" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Accounts.login(email, password)
        const token = createToken(user.id)
        res.status(200).json({ user, token, message: 'User logged in' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}