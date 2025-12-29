// app/model/Comment.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface IComment extends Document {
  id: string;          
  post_id: string;      // related post
  user_id: string;      // related user
  parent_id?: string | null;
  fname: string;
  lname: string;
  email: string;
  body: string;
  status: string;       // e.g., "0" for pending, "1" for approved
  created_at: string;     // use exported timestamp
  updated_at: string;     // use exported timestamp
}

const CommentSchema = new Schema<IComment>(
  {
    id: { type: String, required: true, unique: true },
    post_id: { type: String, required: true },
    user_id: { type: String, required: true },
    parent_id: { type: String, default: null },
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    body: { type: String, required: true },
    status: { type: String, required: true, default: "0" },
    created_at: { type: String, },
    updated_at: { type: String, },
  },
  { timestamps: false }
);

export default models.Comment || model<IComment>("Comment", CommentSchema);
