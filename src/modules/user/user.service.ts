import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/Update.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async create(dto: CreateUserDto){
        return await this.userRepository.createUser(dto)
    }

    async findOne(id: string){
        return await this.userRepository.find(id)
    }

    async findByName(name:string){
        return await this.userRepository.findbyName(name)
    }

    async update(id: string, dto: UpdateUserDto){
        return await this.userRepository.update(id, dto)
    }

    async delete(id: string){
       return await this.userRepository.delete(id)
    }
}
