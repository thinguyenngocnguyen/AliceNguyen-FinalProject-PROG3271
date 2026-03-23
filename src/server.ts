import express, { Request, Response } from 'express'; 
//import ConnectToDb from './infrastructure/connection';
//import { config } from "./config/config"
import {PORT} from './config/config'

const app = express()
const port = 3000;

//Connect to the database
//ConnectToDb();

app.use(express.json()) //middleware to parse incoming JSON requests

app.get('/', (req: Request, res: Response) => {
  res.send('Online forum backend is running')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

export default app;
