import { Router } from "express";

const commentRouter = Router();

commentRouter.get('/', (req, res) => res.send({title: 'GET all comments'}));
commentRouter.get('/:id', (req, res) => res.send({title: 'GET comment by id'}));
commentRouter.post('/', (req, res) => res.send({title: 'Create a new comment'}));
commentRouter.put('/:id', (req, res) => res.send({title: 'Update comment by id'}));
commentRouter.delete('/:id', (req, res) => res.send({title: 'Delete comment by id'}));

export default commentRouter;
