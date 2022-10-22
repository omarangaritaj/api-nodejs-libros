import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class BookDTO extends BaseDTO {
  @IsNotEmpty()
  productName!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  price!: number;

}
