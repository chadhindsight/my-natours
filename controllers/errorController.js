const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = ( err, res) =>{
    // OPerational Error message for client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    // Error message not meant for the user
    else {
        console.log('Error', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        })
    }
}

module.exports = (err, req, res, next) => {
    //Set the error equal to whatever error code is received!
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    
    if(process.env.NODE_ENV === 'development') {
      sendErrorDev(err)
    } 
    else if (process.env.NODE_ENV === 'production') {
        let error  = {...err};

        if(error.name === 'CastError') {error = handleCastErrorDB(error)}
     
        sendErrorProd(err, res)   
    }
   
};