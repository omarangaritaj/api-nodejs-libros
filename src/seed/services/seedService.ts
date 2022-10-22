import * as fs from "fs";
import * as path from "path";
import {parse} from 'csv-parse';

import {BaseService} from "../../config/base.service";
import {SeedEntity} from "../entities/category.entity";
import axios from "axios";
import CSVToJSON from 'csvtojson'

export class SeedService extends BaseService<SeedEntity> {
  constructor() {
    super(SeedEntity);
  }

  private async downloadCsvFile() {
    const csvUrl = this.getEnvironment('BOOK_URL')
    const csvFilePath = path.resolve(__dirname, 'books.csv');
    if (csvUrl != null) {
      const {data} = await axios.get(csvUrl)

      fs.writeFile(csvFilePath, data, async (err) => {
        if (err) return false;
        const users = await CSVToJSON({
          delimiter:';'
        }).fromFile(csvFilePath)
        console.log(users)
      });
    }
  }


  async findCategoryById(id: string): Promise<SeedEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  async createSeed() {
    const data = await this.downloadCsvFile()
    return ['']
  }
}
