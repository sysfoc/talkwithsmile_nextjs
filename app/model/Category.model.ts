// app/model/Category.model.ts
import { Schema, model, models, Document } from "mongoose";

export interface ICategory extends Document {
  id: string;
  name: string;
  slug: string;
  homeh3s: string;
  title: string;
  description: string;
  h1: string;
  created_at: string;
  updated_at: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    homeh3s: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    h1: { type: String, required: true },
    created_at: { type: String, },
    updated_at: { type: String, },
  },
  { timestamps: false }
);

export default models.Category || model<ICategory>("Category", CategorySchema);
