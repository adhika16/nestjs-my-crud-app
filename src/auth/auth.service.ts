/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(profile: any): Promise<any> {
    const user = await this.usersService.findOne(profile.displayName);
    if (user) {
      const { password, ...result } = user;
      return result;
    } else {
      const newUser = await this.usersService.addOne(
        profile.displayName,
        profile.id,
      );
      const { password, ...result } = newUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(user: any) {
    if (!user) {
      return 'No user from google';
    }

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
