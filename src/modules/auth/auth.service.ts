import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/CreateAuth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../database/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject('Check_Service')  private readonly client:ClientProxy
    ){}

    async register(dto: CreateAuthDto){
       const user = await this.userService.findByName(dto.name);
       if (user) {
        throw new NotFoundException('Пользователь с таким логином уже существует');
       }

       const hashPassword = await this.encodePassword(dto.password);
       dto.password = hashPassword.password;
       const newUser = this.userService.create(dto);

       return  newUser
    }

    async login(dto: LoginDto){
        const user = await this.userService.findByName(dto.name);

        if (!user || !bcrypt.compareSync(dto.password, user.password)) {
            throw new BadRequestException({
              success: false,
              error: 'Неверный логин или пароль',
            });
        }

        const tokens = await this.generateToken(user);
       
        return await this.client.send({cmd: 'token'}, tokens);
           
    }

    async encodePassword(password: string): Promise<{ password: string }> {
        const encodedPassword = { password: (await bcrypt.hash(password, 10)) as string };
        return encodedPassword;
    }

    async generateToken(user: UserEntity){
        const payload = {
            userId: user.id,
            name: user.name
        } 

        const accessToken = this.jwtService.sign({ payload, type: 'accessToken' }, 
        { expiresIn: '1h', secret: process.env.JWT_SECRET });

        const refreshToken = this.jwtService.sign({ payload, type: 'refreshToken' }, 
        { expiresIn: '1h', secret: process.env.JWT_SECRET });
        const currentTimestamp = Math.floor(Date.now() / 1000);

        return {
            accessToken,
            refreshToken
        }
    }

    // async validateTokens(accessToken: string, refreshToken: string) {
    //     try {
    //       const access = await this.jwtService.verifyAsync(accessToken);
    //       const refresh = await this.jwtService.verifyAsync(refreshToken);
    //       const currentTimestamp = Math.floor(Date.now() / 1000);
           
    //       if(access.exp >= currentTimestamp && refresh.exp >=currentTimestamp){
    //         return await this.
    //       }
           
    //     } catch (e) {
    //       throw new UnauthorizedException('Invalid tokens');
    //     }
    //   }
      
}
