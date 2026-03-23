import { Router } from "express";

const postRouter = Router();

postRouter.get('/', (req, res) => res.send({title: 'GET all posts'}));
postRouter.get('/:id', (req, res) => res.send({title: 'GET post by id'}));

//Procted router (user must be logged in to create, update, delete posts and add comments)

// add authentication middleware after////
postRouter.post('/', (req, res) => res.send({title: 'Create a new post'}));
postRouter.put('/:id', (req, res) => res.send({title: 'Update post by id'}));
postRouter.delete('/:id', (req, res) => res.send({title: 'Delete post by id'}));

//Likes
postRouter.post('/:id/like', (req, res) => res.send({title: 'Like a post'}));
postRouter.post('/:id/unlike', (req, res) => res.send({title: 'Unlike a post'}));


// update super user after////

export default postRouter;