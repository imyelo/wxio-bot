const fs = require('fs-extra')
const pino = require('pino')
const config = require('config')

const LOG_PATH = config.get('resource.logger.pino')

fs.ensureFileSync(LOG_PATH)

const stream = fs.createWriteStream(LOG_PATH, { flags: 'a' })
const options = { timestamp: pino.stdTimeFunctions.unixTime }

exports.pino = pino(options, stream)
exports.options = options
exports.stream = stream
