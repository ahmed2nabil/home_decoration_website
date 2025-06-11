import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // sign up new user (username , password, email)
    @Post('signup')
    async signup(@Body() signupDto: { username: string; password: string; email: string }) {
        return this.authService.signup(signupDto.username, signupDto.password, signupDto.email);
    }
    // sign in existing user (username , password)
    @Post('signin')
    async signin(@Body() signinDto: { username: string; password: string }) {
        return this.authService.signin(signinDto.username, signinDto.password);
    }
}