const { Router } = require('express');
const userController = require('../controllers/users');

const userRouter = Router()

userRouter.get("/:sessiontoken", userController.show);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/logout", userController.logout);

module.exports = userRouter;
