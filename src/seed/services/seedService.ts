import * as fs from "fs";
import * as path from "path";

import BookEntity from '../../book/entities/bookEntity'

import {BaseService} from "../../config/base.service";
import {SeedEntity} from "../entities/category.entity";
import axios from "axios";
import CSVToJSON from 'csvtojson'
import {IBook} from "../../book/IBook";

export class SeedService extends BaseService<SeedEntity> {
  constructor() {
    super(SeedEntity);
  }

  private async downloadCsvFile(): Promise<Boolean> {
    const csvUrl = this.getEnvironment('BOOK_URL')
    const csvFilePath = path.resolve(__dirname, 'books.csv');
    if (csvUrl == null) {
      return false
    }
    const {data} = await axios.get(csvUrl)

    fs.writeFile(csvFilePath, data, async (err) => {
      if (err) return false;
      const resutlJSON = await CSVToJSON({
        delimiter: ';'
      }).fromFile(csvFilePath)
      await this.saveData(resutlJSON)
    });
    return true
  }

  private async saveData(data: IBook[]) {
    const wasSaved = await BookEntity.insertMany(data)
    console.log('Books inserted in DB')
    return wasSaved
  }

  async createSeed(): Promise<Boolean> {
    const booksQty = await BookEntity.count()
    console.log(booksQty)
    if (booksQty != 0) return false
    const result = await this.downloadCsvFile()
    return result
  }
}
