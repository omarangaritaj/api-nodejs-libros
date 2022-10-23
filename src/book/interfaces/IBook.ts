import {IPagination} from "../../shared/interfaces/pagination.interfaces";

export interface IBook extends IPagination{
  key?: string;
  "isbn": string
  "title": string
  "author": string
  "year": string
  "publisher": string
}