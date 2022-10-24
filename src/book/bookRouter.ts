import {Request, Response} from "express";
import {BaseRouter} from "../shared/router/router";
import {BookController} from "./controllers/bookController";
import {BookMiddleware} from "./middlewares/bookMiddleware";
import {check, query} from "express-validator";

export class BookRouter extends BaseRouter<BookController,
  BookMiddleware> {
  constructor() {
    super(BookController, BookMiddleware);
  }

  routes(): void {

    this.router.get("/book",
      [
        check('limit', 'Debe ser un valor entre 1 y 50').isInt({min: 1, max: 50}),
        check('page', 'Debe ser un valor mayor a 0').isInt({min: 0}),
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) => this.controller.getBooks(req, res)
    );

    this.router.get("/book/search",
      [
        check('limit', 'Debe ser un valor entre 1 y 50').isInt({min: 1, max: 50}),
        check('page', 'Debe ser un valor mayor a 0').isInt({min: 0}),
        query(['author', 'isbn', 'publisher', 'title', 'year']).escape(),
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) => this.controller.findBookByQuery(req, res)
    );

    this.router.get("/book/:id",
      [
        check('id', 'Debe ser un ID válido').isMongoId(),
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) => this.controller.getBookById(req, res)
    );

    this.router.post(
      "/book",
      [
        check("ISBN", "Debe ser una palabra mínimo de 2 carácteres").isString().isByteLength({min: 2}),
        check("Book-Title", "Debe ser una palabra mínimo de 2 carácteres").isString().isByteLength({min: 2}),
        check("Book-Author", "Debe ser una palabra mínimo de 2 carácteres").isString().isByteLength({min: 2}),
        check("Year-Of-Publication", "Debe ser un año válido").isNumeric().isByteLength({min: 4}),
        check("Publisher", "Debe ser una palabra mínimo de 2 carácteres").isString().isByteLength({min: 2}),
        check("Image-URL-S", "Debe ser una URL válida").isURL(),
        check("Image-URL-M", "Debe ser una URL válida").isURL(),
        check("Image-URL-L", "Debe ser una URL válida").isURL(),
        this.middleware.bookValidator,
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) => this.controller.createBook(req, res)
    );

    this.router.put(
      "/book/:id",
      [
        check('id').isMongoId(),
        this.middleware.bookValidator,
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) => this.controller.updateBook(req, res)
    );

    this.router.delete(
      "/book/:id",
      [
        check('id').isMongoId(),
        this.middleware.errorValidation,
      ],
      (req: Request, res: Response) => this.controller.deleteBook(req, res)
    );
  }
}
