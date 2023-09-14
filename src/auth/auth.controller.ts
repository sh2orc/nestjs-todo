import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './crediential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    async signUp(@Body() authCredentialDto: CredentialsDto): Promise<void>{
        this.authService.signUp(authCredentialDto);
    }   

    @Post('/signin')
    async signIn(@Body() authCredentialDto: CredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialDto);
    }
    
}
