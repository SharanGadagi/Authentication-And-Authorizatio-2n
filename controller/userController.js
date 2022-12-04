const db = require('../connection/db');
const User = db.user;
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    try {

        const { firstName, lastName, fullName, dob, age, gender, email, pno, password, confirmPassword, role } = req.body;

        const userEmail = await User.findOne({
            where: {
                email: email
            }
        })

        if (userEmail == null) {
            if (((firstName && lastName) || fullName) && dob && age && gender && email && pno && password && confirmPassword) {

                const hashedPassword = await bcrypt.hash(password, 10);
                const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)

                if (password === confirmPassword) {

                    var user = await User.create({
                        firstName,
                        lastName,
                        fullName,
                        dob,
                        age,
                        gender,
                        email,
                        pno,
                        password: hashedPassword,
                        confirmPassword: hashedConfirmPassword,
                        role
                    })



                    res.status(201).send({
                        user,
                        message: "user created"
                    })

                } else {
                    res.status(400).send({ message: "Password And ConfirmPassword Doesn't Match" })
                }

            } else {
                res.status(400).send({ message: "All Fields All Required" })
            }

        } else {
            res.status(400).send({ message: "Email Already Exist" })
        }




    } catch (error) {
        console.log(error);
    }
}


const allUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.findAll({});

        res.status(200).json({
            users: users
        })

    } catch (error) {
        console.log(error)
    }
}


const singleUser = async (req, res, next) => {
    let user;

    try {

        user = await User.findOne({
            where: { id: req.params.id }
        })

        res.status(200).json({
            user: user
        })

    } catch (error) {
        console.log(error);
    }
}



const updateUser = async (req, res, next) => {
    let user;
    const { firstName, lastName, fullName, dob, age, gender, email, pno, password, confirmPassword, role } = req.body;

    try {

        user = await User.update({
            firstName,
            lastName,
            fullName,
            dob,
            age,
            gender,
            email,
            pno,
            password,
            confirmPassword
        }, {
            where: { id: req.params.id }
        })

        //  await user.save();

        res.status(200).send({
            user
        })

    } catch (error) {
        console.log(error);
    }

}



const patchUpdateUser = async (req, res, next) => {
    let user;
    const { firstName, lastName, fullName, dob, age, gender, email, pno, password, confirmPassword, role } = req.body;

    try {

        user = await User.update({
            firstName,
            lastName,
            fullName,
            dob,
            age,
            gender,
            email,
            pno,
            password,
            confirmPassword
        }, {
            where: { id: req.params.id }
        })



        res.status(200).send({
            user
        })

    } catch (error) {
        console.log(error);
    }

}





const deleteUser = async (req, res, next) => {
    let user
    try {

        user = await User.destroy({
            where: { id: req.params.id }
        })



        res.status(200).send({
            message: 'user deleted'
        })

    } catch (error) {
        console.log(error);
    }
}




const login = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body)

    if (email && password) {

        const user = await User.findOne({
            where: { email }
        })

        if (user != null) {
            const passwordMatched = await bcrypt.compare(password, user.password)


            //token
            
            const token = jsonWebToken.sign({
                userId: user.id
               
              }, process.env.JWT_SCRETKEY, {
                expiresIn: '20m'
            })


            // token saved in cookie
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 60000),
                httpOnly: true
            });

            if (user.email === email && passwordMatched) {
                res.status(200).send({
                    message: "Login successfully",
                    token,
                    userId:user.id,
                    firstName: user.firstName,
                    lastName:user.lastName,
                    fullName:user.fullName,
                    email:user.email,
                    phone:user.pno,
                    dob:user.dob,
                    age:user.age,
                    gender:user.gender,
                    role:user.role


                })
            }

        } else {
            res.status(400).send({ message: "You Are NOt A Register User" })
        }



    } else {
        res.status(400).send({ message: "All Fields All Required" })
    }

}


const logout = async (req, res, next) => {
    res.cookie('jwt', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
}


const authenticationCheck = async (req, res, next) => {
    res.send("you are authenticated")
}



module.exports = {
    registerUser,
    allUsers,
    singleUser,
    updateUser,
    deleteUser,
    patchUpdateUser,
    login,
    authenticationCheck,
    logout
}