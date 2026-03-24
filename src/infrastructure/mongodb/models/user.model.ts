import mongoose from "mongoose";
import { match } from "node:assert";
import { time } from "node:console";
import { constants } from "node:module";

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Username is required'], unique: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] },
  password: { type: String, required: [true, 'Password is required'], minLength: 6 },
  role: { type: String, enum: ['user', 'super user','admin'], default: 'user' },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

