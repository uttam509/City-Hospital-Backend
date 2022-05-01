import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodb id erro cast error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    // Mongoose Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT error 
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid Token`;
        err = new ErrorHandler(message, 400)
    }

    // JWT Expire Error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        status: false,
        message: err.message
        // error:err.stack
    })

}

export default errorMiddleware;