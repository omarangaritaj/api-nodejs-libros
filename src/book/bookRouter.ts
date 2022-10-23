import {BaseRouter} from "../shared/router/router";
import {BookController} from "./controllers/bookController";
import {BookMiddleware} from "./middlewares/bookMiddleware";
import {check} from "express-validator";
import {Request, Response} from "express";

export class BookRouter extends BaseRouter<BookController,
  BookMiddleware> {
  constructor() {
    super(BookController, BookMiddleware);
  }

  routes(): void {

    this.router.get("/book",
      [
        check('limit', 'Un valor entre 1 y 50').isInt({min: 1, max: 50}),
        check('offset', 'Un valor mayor a 0').isInt({min: 0}),
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) => this.controller.getBooks(req, res)
    );

    this.router.get("/book/search",
      [
        check('limit', 'Un valor entre 1 y 50').isInt({min: 1, max: 50}),
        check('offset', 'Un valor mayor a 0').isInt({min: 0}),
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) =>this.controller.findBookByQuery(req, res)
    );

    this.router.get("/book/:id",
      [
        check('id', 'Debe ser un ID válido').isMongoId(),
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) =>this.controller.getBookById(req, res)
    );

    this.router.post(
      "/book/create",
      this.controller.createBook
    );

    this.router.put(
      "/book/update/:id",
      this.controller.updateBook
    );

    this.router.delete(
      "/book/delete/:id",
      this.controller.deleteBook
    );
  }
}
