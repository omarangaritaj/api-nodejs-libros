import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { ProductMiddleware } from "./middlewares/product.middleware";
export class ProductRouter extends BaseRouter<
  ProductController,
  ProductMiddleware
> {
  constructor() {
    super(ProductController, ProductMiddleware);
  }

  routes(): void {
    this.router.get("/book", (req, res) =>
      this.controller.getProducts(req, res)
    );
    this.router.get("/book/product/:id", (req, res) =>
      this.controller.getProductById(req, res)
    );
    this.router.get("/book/search", (req, res) =>
      this.controller.findProductsByName(req, res)
    );
    this.router.post(
      "/book/create",
      (req, res, next) => [
        this.middleware.checkAdminRole(req, res, next),
        this.middleware.productValidator(req, res, next),
      ],
      (req, res) => this.controller.createProduct(req, res)
    );
    this.router.put(
      "/book/update/:id",
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.controller.updateProduct(req, res)
    );
    this.router.delete(
      "/book/delete/:id",
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.controller.deleteProduct(req, res)
    );
  }
}
