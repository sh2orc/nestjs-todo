import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'latte.lee.secret',
      signOptions: {
        expiresIn: 3600, // 1 hour
      }
    }),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
