const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const userSchema = require('./schemas/user')

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisisynewcourse')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

// Suppressing unnecessary fields
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
        delete ret.password
        delete ret.tokens
    } 
}
userSchema.set('toObject', fieldOptions)
userSchema.set('toJSON', fieldOptions)

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login.')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login.')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User