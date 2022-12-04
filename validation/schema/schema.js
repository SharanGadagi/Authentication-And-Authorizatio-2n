const joi=require('joi');

exports.userRegisterSchema= joi.object({
  firstName:joi.string(),
  lastName:joi.string(),
 //  fullNames:firstName.concat(lastName),
  fullName:joi.string().min(5),
  dob:joi.date().required(),
  age:joi.number().integer().required(), 
  gender:joi.string().required(), 
  email:joi.string().email({
     minDomainSegments:2,
     tlds:{
         allow:["com","in"]
     }
  }).required(), 
  pno:joi.number().min(10).required(), 
   //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  // .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"))
  password:joi.string().min(8).max(30).required(),
  confirmPassword:joi.ref("password"),
  role:joi.string().valid("Admin", "User")
}).xor("fullName" , "firstName")    //enter fullName or firstName
.and("firstName" ,"lastName")    //enter fistName  and lastName must filled


//   const payload={
//    firstName:"sharan",
//    lastName:"Gadagi",
// //    fullName:"sharan Gadagi",

//   dob:"1998-08-14",
//    age:24,
//    gender:"male",
//    email:"sharan@gmail.com",
//    pno:8971078420,
//    password:"Shan@2482",
//    confirmPassword:"Shan@2482",
//    role:"Admin"
//   }

//   const {error,value}=this.userRegisterSchema.validate(payload);
//   if(error){
//     console.log(error.details[0].message);
//   }else{
//     console.log(value)
//   }


exports.userLogin=joi.object({
  password:joi.string().min(8).max(30).required(),
  email:joi.string().email({
    minDomainSegments:2,
    tlds:{
        allow:["com","in"]
    }
 }).required()
})