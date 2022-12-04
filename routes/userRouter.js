const express = require('express');
const userController = require('../controller/userController')
const isAuthenticatedUser = require('../middleware/auth')
const validation=require('../validation/validations/joiValidation')

const userRoutes = express.Router();

userRoutes.route('/').post( validation.userRegistration  ,userController.registerUser);
// userRoutes.route('/all').get(userController.allUsers);

userRoutes.route('/all').get(isAuthenticatedUser.auth,isAuthenticatedUser.authorizeRoles("Admin"),userController.allUsers);

userRoutes.route('/single/:id').get(isAuthenticatedUser.auth,isAuthenticatedUser.authorizeRoles("User"), userController.singleUser);
userRoutes.route('/update/:id').put(isAuthenticatedUser.auth,isAuthenticatedUser.authorizeRoles("User"),userController.updateUser);
userRoutes.route('/patch/:id').patch(isAuthenticatedUser.auth,isAuthenticatedUser.authorizeRoles("User"), userController.patchUpdateUser);
userRoutes.route('/delete/:id').delete(isAuthenticatedUser.auth,isAuthenticatedUser.authorizeRoles("User"), userController.deleteUser);
userRoutes.route('/login').post( validation.userLogin,userController.login);
userRoutes.route('/logout').get(isAuthenticatedUser.auth, userController.logout);
userRoutes.route('/auth').get(isAuthenticatedUser.auth, userController.authenticationCheck);





module.exports = userRoutes;