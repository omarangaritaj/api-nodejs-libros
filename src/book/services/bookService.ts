import QueryString from "qs";
import {DeleteResult, UpdateResult} from "typeorm";
import {BookDTO} from "../dto/bookDTO";

import {BookEntity} from "../entities/bookEntity";
import {IBook} from "../IBook";
import {BaseService} from "../../config/base.service";


export class BookService extends BaseService<BookDTO>{
  constructor() {
    super(BookEntity);
  }

  async findAllBooks(){//: Promise<IBook[]> {
    // return await this.execRepository.find();
  }

  async findBookById(id: string):Promise<Boolean>{//: Promise<IBook | null> {
    // return (await this.execRepository).findOneBy({id});
    return await true
  }

  // @ts-ignore
  async findBookByName(
    productName:
      | string
      | string[]
      | QueryString.ParsedQs
      | QueryString.ParsedQs[]
  ):Promise<Boolean>{//: Promise<IBook[] | []> {
    // return (await this.execRepository)
    //   .createQueryBuilder("products")
    //   .where("products.productName like :productName", {
    //     productName: `%${productName}%`,
    //   })
    //   .getMany();
    return await true
  }

  async createBook(body: BookDTO):Promise<Boolean>{//: Promise<IBook> {
    // return await BookEntity.create(body)
    return await true
  }

  async deleteBook(id: string):Promise<Boolean>{//: Promise<DeleteResult> {
    // return (await this.execRepository).delete({id});
    return await true
  }

  async updateBook(
    id: string,
    infoUpdate: BookDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
