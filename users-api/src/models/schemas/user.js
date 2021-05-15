const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('E-mail is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length <= 6) {
                throw new Error('Password should be greater than 6.')
            }
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word "password".')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

module.exports = userSchema