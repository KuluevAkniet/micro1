import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { BaseRepository } from "src/shares/base/base.repository";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

@Injectable()
export class UserRepository  extends BaseRepository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly repository: Repository<UserEntity>
    ){
        super();
    }

    async findByIds(id: string) {
        return this.repository.findOne({where:{id:id}})
    }

    async findbyName(name: string){
        return await this.repository.findOne({
            where:{name: name}
        })
    }

    async update(id: string, dto: CreateUserDto ) {
        return this.repository.update(id, dto);
    }
    
    async createUser(dto: CreateUserDto){
      const user = this.repository.create(dto)  
      return await this.repository.save(user)
    }

    delete(id: string) {
        return this.repository.delete(id);
    }
}
