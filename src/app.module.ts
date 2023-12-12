import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
