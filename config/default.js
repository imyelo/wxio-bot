const path = require('path')
const pkg = require('../package.json')

module.exports = Object.assign(
  {},
  { package: pkg },
  {
    server: {
      host: '0.0.0.0',
      port: 8086,
    },
    resource: {
      logger: {
        pino: path.resolve(__dirname, '../.logs/pino.log'),
      },
      lowdb: {
        path: path.resolve(__dirname, '../.data/lowdb.json'),
      },
      snapshot: {
        dir: path.resolve(__dirname, '../.snapshots'),
      },
      discord: {
        app: {
          id: '',
          secret: '',
        },
        bot: {
          token: '',
        },
        webhook: {
          id: '',
          token: '',
        },
      },
    },
  }
)
