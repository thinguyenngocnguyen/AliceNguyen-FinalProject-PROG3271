import { Router } from "express";
import { signUp } from "../../controllers/auth.controller"; 
import { signIn } from "../../controllers/auth.controller";

const authRouter = Router();
// Path: /api/v1/auth (GET)
authRouter.get('/', (req, res) => {
	res.status(200).json({
		message: 'Auth route is working',
		endpoints: ['POST /api/v1/auth/sign-up', 'POST /api/v1/auth/sign-in']
	});
});

//Path: /api/v1/auth/sign-up(POST)
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);


export default authRouter;

                                                                 