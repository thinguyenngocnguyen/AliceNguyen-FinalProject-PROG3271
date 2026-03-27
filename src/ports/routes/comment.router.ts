import { Router } from "express";
import authorize from '../middlewares/auth.middleware';
import { createComment } from "../../controllers/comment.controller";

const commentRouter = Router();

commentRouter.get('/', (req, res) => res.send({title: 'GET all comments'}));
commentRouter.get('/:id', (req, res) => res.send({title: 'GET comment by id'}));
commentRouter.post('/create-comment', authorize, createComment);
commentRouter.put('/:id', (req, res) => res.send({title: 'Update comment by id'}));
commentRouter.delete('/:id', (req, res) => res.send({title: 'Delete comment by id'}));

export default commentRouter;
