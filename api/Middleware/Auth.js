const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        const error = new Error('No autenticado, No hay JWT')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1]
    let tokenChecker

    try {
        tokenChecker = jwt.verify(token, 'SECRETKEY')
    } catch (e) {
      e.statusCode = 500
      throw e
    }

    if(!tokenChecker){
      const error = new Error('No autenticado')
      error.statusCode = 401
      throw error
    }

    next()
}
