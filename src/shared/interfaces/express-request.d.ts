import { Role, Status } from '../enums/role.enum';

declare module 'express' {
  interface Request {
    user?: UserRequest;
  }

  interface UserRequest {
    id: number;
    email: string;
    role: Role;
    sub: number;
    name: string;
    status: Status;
    is_active: boolean;
    iat: number;
    exp: number;
  }
}
