const mongoose = require('mongoose')

const developerConnectionURL = 'mongodb://127.0.0.1:27017/users-api'
const connectionURL = process.env.MONGODB_URI || developerConnectionURL;

// TODO: Change user/pass to use environment variables
mongoose.connect(connectionURL, {
    authSource: 'admin',
    user: 'mongodbuser',
    pass: 'mongodbpwd',
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})