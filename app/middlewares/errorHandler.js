function errorHandler(err, req, res, next){

    if(err){
        return res.status(500).json({
            error: err.message,
            message: "Errore del server, riprova piu tardi"
        })
    }

    next();

}

module.exports = errorHandler;