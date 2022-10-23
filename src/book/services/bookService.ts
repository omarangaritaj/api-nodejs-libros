import QueryString from "qs";
import {BookDTO} from "../dto/bookDTO";

import BookEntity from "../entities/bookEntity";
import {IBook} from "../interfaces/IBook";
import {BaseService} from "../../config/base.service";
import {IPagination} from "../../shared/interfaces/pagination.interfaces";


export class BookService extends BaseService<BookDTO> {
  constructor() {
    super(BookEntity);
  }

  async findAllBooks({offset, limit}: IPagination): Promise<IBook[]> {
    return BookEntity.find()
      .skip(offset)
      .limit(limit)
      .select(["-__v",]);
  }

  async findBookById(id: string): Promise<IBook | null> {
    return BookEntity.findOne({_id: id}).select(["-__v",]);
  }

  // @ts-ignore
  async findBookByQuery(
    productName:
      | string
      | string[]
      | QueryString.ParsedQs
      | QueryString.ParsedQs[]
  ): Promise<Boolean> {//: Promise<IBook[] | []> {
    // return (await this.execRepository)
    //   .createQueryBuilder("products")
    //   .where("products.productName like :productName", {
    //     productName: `%${productName}%`,
    //   })
    //   .getMany();
    return await true
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
