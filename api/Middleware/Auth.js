/*This middleware fulfills the function of verifying if the user is authenticated
 and if it is verifying that the token he has is valid.*/


//Importing the json web token library
const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const authHeader = req.get('Authorization')

    //Verify that the request has a header.
    if (!authHeader) {
        const error = new Error('Not authenticated,There is no JWT.')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1]
    let tokenChecker

    try {
        //checking the validity of the token.
        tokenChecker = jwt.verify(token, 'SECRETKEY')
    } catch (e) {
      e.statusCode = 500
      throw e
    }

    //Answer in case you are not authenticated.
    if(!tokenChecker){
      const error = new Error('Not authenticated')
      error.statusCode = 401
      throw error
    }

    next()
}
