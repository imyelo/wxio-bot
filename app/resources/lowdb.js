const fs = require('fs-extra')
const config = require('config')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const DB_PATH = config.get('resource.lowdb.path')

fs.ensureFileSync(DB_PATH)

const db = lowdb(new FileSync(DB_PATH))

db.defaults({
  wxapi: {
    apis: [],
  },
}).write()

module.exports = db
