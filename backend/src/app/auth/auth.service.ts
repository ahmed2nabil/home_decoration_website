import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}
    
    async signup(username: string, password: string, email: string) {
        const isUserExist = await this.userService.findOne(username);
        if (isUserExist) throw new ConflictException('User already Exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await this.userService.create(username, hashedPassword, email);
        return {
            accessToken: this.jwtService.sign({ username: user.username, sub: user._id }),
            expiresIn: 8 * 60 * 60 // seconds
        }
    }
    
    async signin(username: string, password: string) {
        const user = await this.userService.findOne(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { username: user.username, sub: user._id };
            return {
                accessToken: this.jwtService.sign(payload),
                expiresIn: 8 * 60 * 60 // seconds
            };
        }
        throw new UnauthorizedException('Invalid username or password');
    }
}
