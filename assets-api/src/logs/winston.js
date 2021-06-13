const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch')
const elasticsearch = require('@elastic/elasticsearch')

const client = new elasticsearch.Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'changeme'
      }
  })

const esTransportOpts = {
    client,
    index: 'assets-logs'
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new ElasticsearchTransport(esTransportOpts)
    ]
})

module.exports = logger