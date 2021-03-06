const Favorite = require('../models/favorite')
const status = require('statuses')

exports.create = async (req, res) => {
    const favorite = new Favorite({
        ...req.body,
        userId: req.user._id
    })

    try {
        await favorite.save()
        res.status(status('Created')).send(favorite)
    } catch(e) {
        res.status(status('Bad Request')).send(e)
    }
}

exports.getAll = async (req, res) => {
    try {
        await req.user.populate({
            path: 'favorites'
        }).execPopulate()
        res.status(status('OK')).send(req.user.favorites)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e) 
    }
}

exports.delete = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!favorite) {
            return res.status(status('Not Found')).send()
        }
        res.status(status('OK')).send(favorite)
    } catch(e) {
        res.status(status('Internal Server Error')).send(e)
    }
}