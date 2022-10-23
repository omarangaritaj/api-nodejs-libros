import {BookDTO} from "../dto/bookDTO";

import BookEntity from "../entities/bookEntity";
import {IBook} from "../interfaces/IBook";
import {BaseService} from "../../config/base.service";
import {IPagination} from "../../shared/interfaces/pagination.interfaces";


export class BookService extends BaseService<BookDTO> {
  constructor() {
    super(BookEntity);
  }

  async findAllBooks({offset, limit}: IPagination) {

    const [records, total] = await Promise.all([
      BookEntity.find()
        .skip(offset)
        .limit(limit)
        .select(["-__v",]),
      BookEntity.find().count()
    ])
    return {records, total}
  }

  async findBookById(id: string) {
    return {records: await BookEntity.findOne({_id: id}).select(["-__v",]), total: 1};
  }

  async findBookByQuery({offset, limit, bookQuery}: IPagination) {

    const query = {
      $or: [
        {"ISBN": {$regex: `.*${bookQuery}.*`}},
        {"Book-Title": {$regex: `.*${bookQuery}.*`}},
        {"Book-Author": {$regex: `.*${bookQuery}.*`}},
        {"Year-Of-Publication": {$regex: `.*${bookQuery}.*`}},
        {"Publisher": {$regex: `.*${bookQuery}.*`}},
      ]
    }

    const [records, total] = await Promise.all([
      BookEntity.find(query)
        .skip(offset)
        .limit(limit)
        .select(["-__v",]),
      BookEntity.find(query).count()
    ])
    return {records, total}
  }

  async createBook(body: BookDTO): Promise<Boolean> {//: Promise<IBook> {
    // return await BookEntity.create(body)
    return await true
  }

  async deleteBook(id: string): Promise<Boolean> {//: Promise<DeleteResult> {
    // return (await this.execRepository).delete({id});
    return await true
  }

  async updateBook(
    id: string,
    infoUpdate: BookDTO
  ): Promise<Boolean> {//: Promise<DeleteResult> {
    // return (await this.execRepository).delete({id});
    return await true
  }
}
