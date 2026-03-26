import { Router } from "express";
import { createPost } from "../../controllers/post.controller";
import { updatePost } from "../../controllers/post.controller";
import { forceEditPost } from "../../controllers/post.controller";
import { likePost } from "../../controllers/post.controller";
import { deletePost } from "../../controllers/post.controller";
import authorize from "../middlewares/auth.middleware";

const postRouter = Router();

postRouter.get('/', (req, res) => res.send({title: 'GET all posts'}));
postRouter.get('/:id', (req, res) => res.send({title: 'GET post by id'}));

//Procted router (user must be logged in to create, update, delete posts and add comments)

// add authentication middleware after////
postRouter.post('/create-post', authorize, createPost);
postRouter.put('/:id/update-post', authorize, updatePost);
postRouter.delete('/:id/delete-post', authorize, deletePost);

//Likes
postRouter.post('/:id/like', authorize, likePost);
//postRouter.post('/:id/unlike', authorize, (req, res) => res.send({title: 'Unlike a post'}));

//Super user force edit others post
postRouter.put('/:postId/force-edit', authorize, forceEditPost);

export default postRouter;