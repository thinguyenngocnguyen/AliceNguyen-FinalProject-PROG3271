import express, { Request, Response } from 'express'; 
import connectToDatabase from './infrastructure/connection';
import {PORT} from './config/config'
import userRouter from './ports/routes/user.router';
import postRouter from './ports/routes/post.router';
import authRouter from './ports/routes/auth.routes';
import commentRouter from './ports/routes/comment.router';
import adminRouter from './ports/routes/admin.router';
import errorMiddleware from './ports/middlewares/error.middleware';

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
app.use('/api/v1/admin', adminRouter);

app.use(errorMiddleware) // Global error handling middleware

app.get('/', (req: Request, res: Response) => {
  res.send('Online forum backend is running')
})

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)

  await connectToDatabase();
})

export default app;
