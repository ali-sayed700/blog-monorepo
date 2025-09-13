import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/SignIn.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    // check email if exists
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');

    // check password if valid
    const passMatched = await verify(user.password, password);
    if (!passMatched) throw new UnauthorizedException('Invalid Credentials');

    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async signIn(user: User) {
    const { accessToken } = await this.generateToken(user.id);
    return { id: user.id, name: user.name, avatar: user.avatar, accessToken };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new UnauthorizedException('User not found');
    const currentUser = { id: user.id };

    return currentUser;
  }

  async validateGoogleUser(googleUser: CreateUserInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
    });
    if (user) {
      const { password, ...authUser } = user;
      return authUser;
    }

    const dbUser = await this.prisma.user.create({
      data: {
        ...googleUser,
      },
    });
    const { password, ...authUser } = dbUser;
    authUser;
  }
}
