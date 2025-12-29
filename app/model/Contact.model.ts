// app/model/Contact.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface IContact extends Document {
  id: string;
  fname: string;
  lname: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
}

const ContactSchema = new Schema<IContact>(
  {
    id: { type: String, required: true, unique: true },
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
  },
  { timestamps: false }
);

export default models.Contact || model<IContact>("Contact", ContactSchema);
