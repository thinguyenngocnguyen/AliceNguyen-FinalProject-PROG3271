const errorMiddleware = (err: Error, req: any, res: any, next: any) => {
    try{
        let error = { ...err };
        error.message = err.message;

        console.error(err);

        //Mongoose bad ObjectId
        if(err.name === 'CastError'){
            const message = (`Resource not found with id of`);
            error = new Error(message);
            res.status(404).json({ success: false, error: message });
        }

        //Mongoose duplicate key
        if((err as any).code === 11000){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            res.status(400).json({ success: false, error: message });
        }

        //Mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values((err as any).errors).map((val: any) => val.message);
            error = new Error(message.join(', '));
            res.status(400).json({ success: false, error: message });
        }

        res.status((error as any).statusCode || 500).json({ success: false, error: 'Server Error' });


    }catch(error){
        next(error);
    }
}

export default errorMiddleware;
