import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';

// Kirish va ro'yxatdan o'tishdan keyin qaytadigan javob: token + parolsiz profil
export async function createSession(jwtService: JwtService, user: UserEntity) {
  const accessToken = await jwtService.signAsync({ sub: user.id, isAdmin: user.isAdmin });
  const { password: _password, ...profile } = user;
  return { accessToken, user: profile };
}
