import { Request } from "express";
import QueryString from "qs";
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { BookDTO } from "../dto/bookDTO";

import { BookEntity } from "../entities/bookEntity";
export class BookService extends BaseService<BookEntity> {
  constructor() {
    super(BookEntity);
  }

  async findAllProducts(): Promise<BookEntity[]> {
    return (await this.execRepository).find();
  }
  async findProductById(id: string): Promise<BookEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findProductsByName(
    productName:
      | string
      | string[]
      | QueryString.ParsedQs
      | QueryString.ParsedQs[]
  ): Promise<BookEntity[] | []> {
    return (await this.execRepository)
      .createQueryBuilder("products")
      .where("products.productName like :productName", {
        productName: `%${productName}%`,
      })
      .getMany();
  }

  async createProduct(body: BookDTO): Promise<BookEntity> {
    return (await this.execRepository).save(body);
  }
  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updateProduct(
    id: string,
    infoUpdate: BookDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
