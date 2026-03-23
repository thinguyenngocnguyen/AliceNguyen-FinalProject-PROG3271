import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({title: 'GET all users'}));
userRouter.get('/:id', (req, res) => res.send({title: 'GET user by id'}));
userRouter.post('/', (req, res) => res.send({title: 'Create a new user'}));
userRouter.put('/:id', (req, res) => res.send({title: 'Update user by id'}));
userRouter.delete('/:id', (req, res) => res.send({title: 'Delete user by id'}));

// update super user here////

export default userRouter;
