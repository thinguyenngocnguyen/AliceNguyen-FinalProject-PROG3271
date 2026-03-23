// import mongoose from 'mongoose';
// import { config } from "../../../../config/config"
// //import mongoose from '../../../../../node_modules/mongoose/types/index.d';

// //const mongoDb = config.mongo.url;

// export const ConnectToDb = async () => {
//   try {
//     await mongoose.connect(mongoDb);
//     console.log('Connected to database successfully');
//     // connection(mongoDb).then(() => {
//     //   console.log('Connected to database successfully');
//     // })
//   } catch (err) {
//     console.log('Disconnect', err);
//   }
// }

import mongoose from 'mongoose';
import { MONGODB_URI, NODE_ENV } from '../config/config';

// Make sure the URI exists
if (!MONGODB_URI) {
  throw new Error(
    'Please provide a MongoDB URI in the environment variables inside .env file'
  );
}

// Create the connection function
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string); 
    console.log(`Connected to MongoDB successfully in ${NODE_ENV} environment`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;