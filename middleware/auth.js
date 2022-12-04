const jsonWebToken = require('jsonwebtoken');
const db = require('../connection/db')
const User = db.user;




const auth = async (req, res, next) => {
    try {

        //get the token from database
        const token = req.cookies.jwt;
        console.log(token)

        //verify the token 
        const verifyUser = jsonWebToken.verify(token, process.env.JWT_SCRETKEY)
        console.log(verifyUser);

        //find user db id and token id 

        const users = await User.findOne({ where: { id: verifyUser.userId } });
        console.log(users);

        //get anty field values 
        // console.log(user.name);

        req.token = token;
        req.user = users;
        // req.userRole=verifyUser.role;
        // console.log(req.userRole)

        next();
    } catch (error) {
        res.status(401).send(error)
    }
}




const authorizeRoles=(...roles)=>{
    return  (req,res,next)=>{
      //role is not present in user
      
      if(!roles.includes(req.user.role)){
      return res.status(401).send("not allowed")
      };
      next();
    };
  
  }

module.exports = {

    auth,
    authorizeRoles
}


