const middleware = {}

middleware['authorizedPath'] = require('../middleware/authorizedPath.js')
middleware['authorizedPath'] = middleware['authorizedPath'].default || middleware['authorizedPath']

middleware['to'] = require('../middleware/to.js')
middleware['to'] = middleware['to'].default || middleware['to']

export default middleware
