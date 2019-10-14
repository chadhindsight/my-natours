const sendErrorDev = (err, res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: error.stack
    })
}

const sendErrorProd = ( err, res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

module.exports = (err, req, res, next) => {
    //Set the error equal to whatever error code is received!
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    
    if(process.env.NODE_ENV === 'development') {
      sendErrorDev(err)
    } 
    else if (process.env.NODE_ENV === 'production') {
     sendErrorProd(err)   
    }
   
}