// app/model/Blog.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface IBlog extends Document {
  id: string;
  slug: string;
  h1: string;
  meta_title: string;
  meta_desc: string;
  content: string;
  image: string;
  view_counter: string;
  user_id: string;
  category_id: string;
  additional_data: string;
  created_at: string;
  updated_at: string;
  post_updated_on: string | null;
}

const BlogSchema = new Schema<IBlog>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    h1: { type: String, required: true },
    meta_title: { type: String, required: true },
    meta_desc: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    view_counter: { type: String },
    user_id: { type: String, required: true },
    category_id: { type: String, required: true },
    additional_data: { type: String, default: null },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    post_updated_on: { type: String, default: null },
  },
  { timestamps: false }
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
