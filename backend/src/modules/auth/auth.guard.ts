import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Authorization header is missing or invalid');
      throw new UnauthorizedException('Authorization header is missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    try {
      const user = this.jwtService.verify(token);
      if (!user.id) {
        console.error('Token does not contain user ID');
        throw new UnauthorizedException('Token does not contain user ID');
      }
      request.user = user;
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}