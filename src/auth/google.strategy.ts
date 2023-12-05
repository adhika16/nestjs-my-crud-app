/* eslint-disable prettier/prettier */
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:3000/auth/google/redirect",
        scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const user = await this.authService.validateGoogleUser(profile);
    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}
