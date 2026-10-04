
const { ApiDef } = require('@voxgig/apidef')

const opts = {
  folder: __dirname + '/../model',
  server: 'http://127.0.0.1:8768',
}

module.exports = ApiDef.makeBuild(opts)
