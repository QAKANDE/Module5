const NotFoundHandler = (err,req,res,next) => {
    if(err.httpStatusCode === 404){
        res.status(404).send("Don't be stupid , stop looking for something that doesn't exist")
    }
    else{
        next(err)
    }
}
const unauthorizedHandler = (err, req, res, next) => {
    if (err.httpStatusCode === 401) {
      res.status(401).send("Unauthorized!")
    }
    next(err)
  }
module.exports = {
    NotFoundHandler,
    unauthorizedHandler
}