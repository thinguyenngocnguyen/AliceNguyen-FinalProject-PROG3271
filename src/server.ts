import express, { Request, Response } from 'express'; 
//import ConnectToDb from './infrastructure/connection';
//import { config } from "./config/config"
import {PORT} from './config/config'
import userRouter from './ports/routes/user.router';
import postRouter from './ports/routes/post.router';
import authRouter from './ports/routes/auth.routes';
import commentRouter from './ports/routes/comment.router';

const app = express()
const port = 3000;

//Connect to the database
//ConnectToDb();

app.use(express.json()) //middleware to parse incoming JSON requests

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/comments', commentRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Online forum backend is running')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

export default app;
