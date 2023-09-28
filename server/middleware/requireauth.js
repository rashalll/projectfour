const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) return res.status(401).json({ error: "Authorization token required" })

    const token = authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    try {
        const { id } = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user_id = id
        next()
    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth