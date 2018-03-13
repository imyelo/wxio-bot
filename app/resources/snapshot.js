const fs = require('fs-extra')
const path = require('path')
const config = require('config')

const SNAPSHOT_DIR = config.get('resource.snapshot.dir')

exports.save = async function save (name, content) {
  const fullpath = path.join(SNAPSHOT_DIR, name)
  await fs.ensureDir(path.dirname(fullpath))
  await fs.writeFile(fullpath, content)
}
