import mongoose, {Schema} from 'mongoose';
import {IBook} from "../IBook";

const BookSchema: Schema = new Schema(
  {
    ISBN: {type: String, required: true, unique: true},
    'Book-Title': {type: String, required: true},
    'Book-Author': {type: String, required: true},
    'Year-Of-Publication': {type: String, required: true},
    Publisher: {type: String, required: true},
    'Image-URL-S': {type: String, required: true},
    'Image-URL-M': {type: String, required: true},
    'Image-URL-L': {type: String, required: true},
  },
  {timestamps: true}
);

export default mongoose.model<IBook>('Book', BookSchema);

