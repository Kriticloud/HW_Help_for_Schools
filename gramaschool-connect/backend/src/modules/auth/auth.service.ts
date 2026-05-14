import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from './firebase.service';
import { UsersService } from '../users/users.service';
import { VerifyOtpDto } from './dto/auth.dto';
import { UserRole } from '../../common/enums';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
    private usersService: UsersService,
  ) {}

  async verifyOtpAndLogin(dto: VerifyOtpDto) {
    let decodedToken;
    try {
      decodedToken = await this.firebaseService.verifyIdToken(dto.idToken);
    } catch {
      throw new UnauthorizedException('Invalid Firebase token');
    }

    const phone = decodedToken.phone_number;
    if (!phone) {
      throw new UnauthorizedException('Phone number not found in token');
    }

    let user = await this.usersService.findByPhone(phone);

    if (!user) {
      // Auto-register new user
      user = await this.usersService.create({
        name: dto.name || 'User',
        phone,
        role: dto.role || UserRole.PARENT,
        firebaseUid: decodedToken.uid,
        schoolId: dto.schoolId,
      });
    } else if (!user.firebaseUid) {
      await this.usersService.update(user.id, {});
      // Link firebase UID
      user.firebaseUid = decodedToken.uid;
    }

    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async getProfile(userId: string) {
    return this.usersService.findById(userId);
  }
}
