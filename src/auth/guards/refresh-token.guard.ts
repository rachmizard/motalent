import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
