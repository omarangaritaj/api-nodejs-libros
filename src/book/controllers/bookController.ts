import {Request, Response} from "express";
import {HttpResponse,} from "../../shared/response/http.response";
import {BookService} from "../services/bookService";
import {IPagination} from "../../shared/interfaces/pagination.interfaces";
import {IBook} from "../interfaces/IBook";

export class BookController {
  constructor(
    private readonly bookService: BookService = new BookService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
  }

  async getBooks(req: Request, res: Response) {
    const {page, limit} = req.query
    const queryData = <IPagination>{
      limit: Number(limit),
      page: Number(page),
    }
    try {
      const data = await this.bookService.findAllBooks(queryData);
      if (data.total === 0) {
        return this.httpResponse.NotFound(res, "No hay libros. Ejecute '/api/seed'");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getBookById(req: Request, res: Response) {
    const {id} = req.params;
    try {
      const data = await this.bookService.findBookById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe libro con ese ID");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async findBookByQuery(req: Request, res: Response) {
    const {page, limit, query, author, title, year, publisher, isbn} = req.query
    try {
      const queryData = <IBook>{
        author,
        bookQuery: query,
        isbn,
        limit: Number(limit),
        page: Number(page),
        publisher,
        title,
        year,
      }
      const data = await this.bookService.findBookByQuery(queryData);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createBook(req: Request, res: Response) {
    try {
      const data = await this.bookService.createBook(req.body);
      if (!data) {
        return this.httpResponse.BadRequest(res, "No se pudo crear, puede ser que el libro ya exista");
      }
      return this.httpResponse.Created(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updateBook(req: Request, res: Response) {
    const {id} = req.params;
    try {
      const data = await this.bookService.updateBook(id, req.body);
      if (!data.modifiedCount) {
        return this.httpResponse.NotFound(res, "Hay un error al actualizar");
      }

      return this.httpResponse.Created(res, `Registros modificados: ${data.modifiedCount}`);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteBook(req: Request, res: Response) {
    const {id} = req.params;
    try {
      const data = await this.bookService.deleteBook(id);
      if (!data.deletedCount) {
        return this.httpResponse.NotFound(res, "No se pudo borrar, es posible que el ID no exista");
      }
      return this.httpResponse.Ok(res, {records: `Registros borrados: ${data.deletedCount}`});
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
