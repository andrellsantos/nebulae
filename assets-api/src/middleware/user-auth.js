const axios = require('axios')
const status = require('statuses')

// TODO: Improve it... usign another service to authenticate is realllllly slow
const userAuth = async (req, res, next) => {
    // try {
    //     const token = req.header('Authorization').replace('Bearer ', '')
    //     const url = 'http://localhost:3001/api/users/user-auth?access_key=' + token
        
    //     const response = await axios.get(url)
    //     if(response.data && response.data._id) {
    //         req.user = response.data
    //         next()
    //     } else {
    //         res.status(status('Unauthorized')).send('Please authenticate.')
    //     }
    // } catch(e) {
    //     res.status(status('Unauthorized')).send('Please authenticate.')
    // }
    next()
}

module.exports = userAuth