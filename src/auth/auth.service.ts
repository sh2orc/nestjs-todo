import { ConflictException, ConsoleLogger, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CredentialsDto } from './crediential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {    
    constructor(
        private userRepository:UserRepository, 
        private jwtService: JwtService,
    ) {}
        
    async signUp(credentialDto: CredentialsDto): Promise<void>{
        const {username, password} = credentialDto;

        //hash and salt password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        console.log('salt', salt);
        console.log('hashedPassword', hashedPassword);
        
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
        });

        try{
            await this.userRepository.save(user);
        }catch(error){

            if(error.code === '23505'){
                throw new ConflictException('Username already exists')
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(credentialDto: CredentialsDto): Promise<{accessToken: string}>{
        const {username, password} = credentialDto;
        const user = await this.userRepository.findOne({where:{username}});
 
        console.log('user', user);
        console.log('password', password);

        if(user && (await bcrypt.compare(password, user.password))){
             const payload = {username};
             const accessToken: string = await this.jwtService.sign(payload);
             return {accessToken};
         }else{
             throw new UnauthorizedException('Please check your password');
          }
     }
}
