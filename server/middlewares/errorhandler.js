

const notfound= (req,res,next)=>{
    const error=new Error(`not found : ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const ErrorHandler=(err,req,res,next) =>{
    const statusCode=res.statusCode == 500 ? 200 :res.statusCode;
    res.status(statusCode);
    res.json({
        message:err?.message,
        stack:err?.stack
    });
}

module.exports ={notfound,ErrorHandler};