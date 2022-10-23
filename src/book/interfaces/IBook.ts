import {IPagination} from "../../shared/interfaces/pagination.interfaces";

export interface IBook extends IPagination {
  "isbn": string
  "title": string
  "author": string
  "year": string
  "publisher": string
}

export interface IQuery {
  "ISBN": string | object
  "Book-Title": string | object
  "Book-Author": string | object
  "Year-Of-Publication": string | object
  "Publisher": string | object
  $or?: object | object
}