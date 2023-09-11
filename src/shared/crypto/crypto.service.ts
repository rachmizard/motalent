import { Injectable } from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  private readonly iterations = 10000;
  private readonly keyLength = 64;
  private readonly digest = 'sha512';

  async hashPassword(password: string, salt: string): Promise<string> {
    const hash = pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keyLength,
      this.digest,
    );
    return hash.toString('hex');
  }

  hashPasswordSync(password: string, salt: string): string {
    const hash = pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keyLength,
      this.digest,
    );

    return hash.toString('hex');
  }

  generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  async comparePassword(
    password: string,
    salt: string,
    hash: string,
  ): Promise<boolean> {
    const passwordHash = await this.hashPassword(password, salt);
    return passwordHash === hash;
  }

  syncComparePassword(password: string, salt: string, hash: string): boolean {
    const passwordHash = this.hashPasswordSync(password, salt);
    return passwordHash === hash;
  }

  generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  generateRefreshToken(): string {
    return randomBytes(32).toString('hex');
  }
}
