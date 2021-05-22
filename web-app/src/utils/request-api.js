const axios = require('axios')

const requestAPI = async (url, token, callback) => {
    const authentication = 'Bearer ' + token
    try {
        const response = await axios.get(url, {
                headers: {
                  'Authorization': authentication
                }
            })
        callback(undefined, response.data)
    } catch(e) {
        callback('Error while retrieving data.', undefined)
    }
}

module.exports = requestAPI