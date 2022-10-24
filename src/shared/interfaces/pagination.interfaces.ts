import {Document} from "mongoose";

export interface IPagination extends Document {
  "limit": number
  "page": number
  "bookQuery"?: string
}