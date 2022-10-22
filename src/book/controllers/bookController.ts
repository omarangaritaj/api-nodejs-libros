import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { BookService } from "../services/bookService";

export class BookController {
  constructor(
    private readonly bookService: BookService = new BookService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getProducts(req: Request, res: Response) {
    try {
      // const data = await this.bookService.findAllBooks();
      // if (data.length === 0) {
      //   return this.httpResponse.NotFound(res, "No existe dato");
      // }
      return this.httpResponse.Ok(res, {ok:true});
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.bookService.findBookById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async findProductsByName(req: Request, res: Response) {
    const { search } = req.query;
    try {
      if (search !== undefined) {
        const data = await this.bookService.findBookByName(search);
        if (!data) {
          return this.httpResponse.NotFound(res, "No existe dato");
        }
        return this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.bookService.createBook(req.body);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.bookService.updateBook(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en actualizar");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.bookService.deleteBook(id);
      res.status(200).json(data);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en borrar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
