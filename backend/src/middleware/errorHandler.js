const AppError = require('../utils/AppError');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode || 500).json({
        success: fail,
        status: err.status,
        message: err.message,
        stack: err.stack,
    });
}

const sendErrorProd = (err, res) => {
    if(err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    //Programming or unknown error
    console.error('Error', err);

    return res.status(500).json({
        success: false,
        message: 'Something went wrong',
    });
};

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res);
    }else{
        sendErrorProd(err, res);
    }
};

module.exports = errorHandler;