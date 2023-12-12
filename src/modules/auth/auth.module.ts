import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [UserModule,JwtModule.registerAsync({
    useFactory: async(configService: ConfigService) => ({
      secret: configService.get("JWT_SECRET"),
      signOptions: {expiresIn:configService.get("JWT_EXPIRES_IN")}
    }),
    inject: [ConfigService]
  }),
   ClientsModule.register([{
    name:'Check_Service',
    transport: Transport.RMQ,
    options:{
      urls:['amqp://localhost:5672'],
      queue:'check_tokens',
      queueOptions:{
        durable:false
      },
   },

   }])
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

