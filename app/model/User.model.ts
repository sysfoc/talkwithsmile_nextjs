// app/model/User.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  password: string;
  remember_token?: string | null;
  created_at: string;
  updated_at: string;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email_verified_at: { type: String, default: null },
    password: { type: String, required: true },
    remember_token: { type: String },
    created_at: { type: String },
    updated_at: { type: String },
  },
  { timestamps: false }
);

export default models.User || model<IUser>("User", UserSchema);
