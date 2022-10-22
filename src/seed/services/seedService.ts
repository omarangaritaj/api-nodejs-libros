import {BaseService} from "../../config/base.service";
import {SeedEntity} from "../entities/category.entity";

export class SeedService extends BaseService<SeedEntity> {
  constructor() {
    super(SeedEntity);
  }

  async loadCsvFile(): Promise<SeedEntity[]> {
    return (await this.execRepository).find();
  }

  async findCategoryById(id: string): Promise<SeedEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  createSeed(): [String | null] {
    return ['']
  }
}
