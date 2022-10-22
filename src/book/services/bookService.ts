import QueryString from "qs";
import { DeleteResult, UpdateResult } from "typeorm";
import { BookDTO } from "../dto/bookDTO";

import  BookEntity  from "../entities/bookEntity";
import {IBook} from "../IBook";


export class BookService  {
  constructor() {
  }

  async findAllBooks(): Promise<IBook[]> {
    return await this.execRepository.find();
  }
  async findBookById(id: string): Promise<IBook | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findBookByName(
    productName:
      | string
      | string[]
      | QueryString.ParsedQs
      | QueryString.ParsedQs[]
  ): Promise<IBook[] | []> {
    return (await this.execRepository)
      .createQueryBuilder("products")
      .where("products.productName like :productName", {
        productName: `%${productName}%`,
      })
      .getMany();
  }

  async createBook(body: BookDTO): Promise<IBook> {
    return await BookEntity.create(body)
  }
  async deleteBook(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updateBook(
    id: string,
    infoUpdate: BookDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
