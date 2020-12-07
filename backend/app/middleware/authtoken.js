const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req,res,next){
    if(req.path != '/auth/login'){
      
        if(req.headers.authorization){
            let token= req.headers.authorization.split(' ')[1]; 
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message: 'Fallo al decodificar token',error});
                next();
                            
            });
        }
        else{
            res.status(403).send({message:"No tiene permisos (headers)"});          } 
    }else next(); 



}