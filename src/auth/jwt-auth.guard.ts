import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * JWT Authentication Guard
 * Protects routes by requiring valid JWT token
 * Usage: @UseGuards(JwtAuthGuard) on controllers or routes
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
