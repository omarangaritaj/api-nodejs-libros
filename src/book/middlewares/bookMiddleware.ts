import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

import { BookDTO } from "../dto/bookDTO";

export class BookMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  bookValidator(req: Request, res: Response, next: NextFunction) {
    const { productName, description, category, price } = req.body;

    const valid = new BookDTO();
    valid.productName = productName;
    valid.description = description;
    valid.price = price;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
