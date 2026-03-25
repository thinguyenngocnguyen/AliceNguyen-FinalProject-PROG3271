import { Router } from "express";
import { getAllUsers } from "../../controllers/user.controller";
import { getUser } from "../../controllers/user.controller";
import { createUser } from "../../controllers/user.controller";
import { updateUser } from "../../controllers/user.controller";
import authorize from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', authorize,getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', (req, res) => res.send({title: 'Delete user by id'}));

// update super user here////

userRouter.put('/:id/role', updateUser);

export default userRouter;
