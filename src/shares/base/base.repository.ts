import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export abstract class BaseRepository<Entity> {
  protected readonly repository: Repository<Entity>;

  async create(data: any): Promise<Entity | Entity[]> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async find(criteria?: any) {
    return this.repository.find(criteria);
  }

  async update(criteria: any, data: any): Promise<UpdateResult> {
    const instance = await this.repository.findOne({ where: criteria });
    return this.repository.save({ ...instance, ...data });
  }

  async remove(criteria: any): Promise<Entity | Entity[]> {
    return this.repository.remove(criteria);
  }
}
