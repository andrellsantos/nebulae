const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = require('./schemas/user')

// Virtual Properties
userSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'userId'
})
userSchema.virtual('portfolios', {
    ref: 'Portfolio',
    localField: '_id',
    foreignField: 'userId'
})

userSchema.virtual('favorites', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'userId'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'temporarywordtodecodepassword')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// Suppressing unnecessary fields
const fieldOptions = {
    virtuals: true, 
    versionKey: false,
    transform: function(doc, ret) {
        delete ret.id
        delete ret.password
        delete ret.tokens
    } 
}
// userSchema.set('toObject', fieldOptions)
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