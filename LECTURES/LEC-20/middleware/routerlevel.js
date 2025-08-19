function m5(req,res,next){
    console.log("middlewear m5 chalata");
    next();
}

module.exports.m5=m5