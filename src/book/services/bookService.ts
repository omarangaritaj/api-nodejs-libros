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

  async findBookByQuery(book: IBook) {

    const query = this.buildQuery(book)
    console.log(query)
    const [records, total] = await Promise.all([
      BookEntity.find(query)
        .skip(book.offset)
        .limit(book.limit)
        .select(["-__v",]),
      BookEntity.find(query).count()
    ])
    return {records, total}
  }

  private buildQuery(book: IBook) {
    const presentFields: string[] = []
    Object.keys(book).forEach(key => {
      // @ts-ignore
      if (book[key] && !['limit', 'offset', 'bookQuery'].includes(key)) {
        presentFields.push(key)
      }
    })

    const data = new Map()
    presentFields.forEach(key => {
      // @ts-ignore
      data.set(key, book[key])// {$regex: `.*${book[key]}.*`})
    })
    console.log(data)
    console.log(Object.fromEntries(data))

    // return Object.fromEntries(data)

    return data //Object.fromEntries(data)
    // {

          // $or: [
          //   {"ISBN": {$regex: `.*${book.bookQuery}.*`}},
          //   {"Book-Title": {$regex: `.*${book.bookQuery}.*`}},
          //   {"Book-Author": {$regex: `.*${book.bookQuery}.*`}},
          //   {"Year-Of-Publication": {$regex: `.*${book.bookQuery}.*`}},
          //   {"Publisher": {$regex: `.*${book.bookQuery}.*`}},
          // ],
          // Object.fromEntries(data)
        // }
        //
    // }
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
