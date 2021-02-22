const mongoose = require('mongoose')

const developerConnectionURL = 'mongodb://127.0.0.1:27017/assets-api'
const connectionURL = process.env.MONGODB_URI || developerConnectionURL;

mongoose.connect(connectionURL, {
    authSource: 'admin',
    user: 'mongodbuser',
    pass: 'mongodbpwd',
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})