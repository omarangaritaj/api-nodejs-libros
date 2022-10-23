import {Document} from "mongoose";

export interface IBook extends Document {
  "ISBN": string
  "Book-Title": string
  "Book-Author": string
  "Year-Of-Publication": string
  "Publisher": string
  "Image-URL-S": string
  "Image-URL-M": string
  "Image-URL-L": string
}