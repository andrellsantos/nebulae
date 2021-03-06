const jwt = require('jsonwebtoken')
const status = require('statuses')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // TODO: Use environment variables to store the word to decode
        const decoded = jwt.verify(token, 'temporarywordtodecodetoken')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        
        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch(e) {
        res.status(status('Unauthorized')).send('Please authenticate.')
    }
}

module.exports = auth