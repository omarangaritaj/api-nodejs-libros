import { BaseRouter } from "../shared/router/router";
import { BookController } from "./controllers/bookController";
import { BookMiddleware } from "./middlewares/bookMiddleware";
export class BookRouter extends BaseRouter<
  BookController,
  BookMiddleware
> {
  constructor() {
    super(BookController, BookMiddleware);
  }

  routes(): void {
    this.router.get("/book", (req, res) =>
      this.controller.getBook(req, res)
    );
    this.router.get("/book/product/:id", (req, res) =>
      this.controller.getBookById(req, res)
    );
    this.router.get("/book/search", (req, res) =>
      this.controller.findBookByName(req, res)
    );
    this.router.post(
      "/book/create",
      (req, res, next) => [
        this.middleware.checkAdminRole(req, res, next),
        this.middleware.bookValidator(req, res, next),
      ],
      (req, res) => this.controller.createBook(req, res)
    );
    this.router.put(
      "/book/update/:id",
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.controller.updateBook(req, res)
    );
    this.router.delete(
      "/book/delete/:id",
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.controller.deleteBook(req, res)
    );
  }
}
