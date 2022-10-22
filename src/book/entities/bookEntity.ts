import mongoose, {Schema} from 'mongoose';
import {IBook} from "../IBook";

const BookSchema: Schema = new Schema(
  {
    'ISBN': {type: String, required: true, index: true},
    'Book-Title': {type: String, required: true, index: true},
    'Book-Author': {type: String, required: true, index: true},
    'Year-Of-Publication': {type: String, required: true, index: true},
    'Publisher': {type: String,},
    'Image-URL-S': {type: String,},
    'Image-URL-M': {type: String,},
    'Image-URL-L': {type: String,},
  },
  {timestamps: true}
);

export default mongoose.model<IBook>('Book', BookSchema);

export class BookEntity {
}