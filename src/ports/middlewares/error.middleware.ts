const errorMiddleware = (err: Error, req: any, res: any, next: any) => {
    try {
        console.error(err);

        let statusCode = (err as any).statusCode || (err as any).status || 500;
        let message = err.message || 'Server Error';

        // Mongoose bad ObjectId
        if (err.name === 'CastError') {
            statusCode = 404;
            message = 'Resource not found with id';
        }

        // Mongoose duplicate key
        if ((err as any).code === 11000) {
            statusCode = 400;
            message = 'Duplicate field value entered';
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            statusCode = 400;
            message = Object.values((err as any).errors)
                .map((val: any) => val.message)
                .join(', ');
        }

        res.status(statusCode).json({
            success: false,
            error: statusCode === 500 ? 'Server Error' : message,
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
