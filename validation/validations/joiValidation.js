const JoiSchema=require('../schema/schema');

exports.userRegistration=(req,res,next)=>{
    //user fille fields
    const body=req.body;

    const {error,value}=JoiSchema.userRegisterSchema.validate(body);

    if(error){
      res.status(400).send({error: error.details[0].message}) 
      console.log(error.details[0].message);
 }
next();

}

exports.userLogin=(req,res,next)=>{
    const body=req.body;

    const {error,value}=JoiSchema.userLogin.validate(body);

    if(error){
        res.status(400).send({error: error.details[0].message}) 
        console.log(error.details[0].message);
   }
  next();

}