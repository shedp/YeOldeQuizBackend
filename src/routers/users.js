const { Router } = require("express");
const userController = require("../controllers/users");

const userRouter = Router();

userRouter.get("/:sessiontoken", userController.show);
userRouter.get("/id/:sessiontoken", userController.findUserId);//
userRouter.get("/user/:id", userController.showUser);
userRouter.post("/register", userController.register);//
userRouter.post("/login", userController.login);//
userRouter.delete("/logout", userController.logout);
userRouter.put("/:id", userController.update)

module.exports = userRouter;
