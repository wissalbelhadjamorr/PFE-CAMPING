import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InscriptionDTO } from './inscription.dto';
import { UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sinscrire')
  async inscrire(@Body() dto: InscriptionDTO) {
    return this.authService.inscrire(dto);
  }

  @Post('login')
  async login(@Body() LoginDTO: LoginDTO) {
    return this.authService.login(LoginDTO.email, LoginDTO.password);
  }

  @Get('google')
@UseGuards(AuthGuard('google'))
async google() {}

@Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleCallback(@Req() req) {
  const token = this.authService.creerToken(req.user);
  return { utilisateur: req.user, token };
}
}