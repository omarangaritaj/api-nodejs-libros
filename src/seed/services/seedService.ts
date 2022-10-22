import * as fs from "fs";
import * as path from "path";
import {parse} from 'csv-parse';

import {BaseService} from "../../config/base.service";
import {SeedEntity} from "../entities/category.entity";

export class SeedService extends BaseService<SeedEntity> {
  constructor() {
    super(SeedEntity);
  }

  loadCsvFile(): void {
    const csvFilePath = path.resolve(__dirname, '../books.csv');
    const headers = ["ISBN", "Book-Title", "Book-Author", "Year-Of-Publication", "Publisher", "Image-URL-S", "Image-URL-M", "Image-URL-L"];
    const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf-8'});

    parse(fileContent, {
      delimiter: ',',
      columns: headers,
    }, (error, result: WorldCity[]) => {
      if (error) {
        console.error(error);
      }
      console.log("Result", result);
    });
  }

  async findCategoryById(id: string): Promise<SeedEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  createSeed(): [String | null] {
    return ['']
  }
}
