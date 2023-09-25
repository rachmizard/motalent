import { Role, Status } from '../enums/role.enum';

declare module 'express' {
  interface Request {
    user?: AuthAccountRequest;
  }

  interface AuthAccountRequest {
    id: string | number;
    email?: string;
    role?: Role;
    sub?: string | number;
    name?: string;
    status?: Status;
    is_active?: boolean;
    iat?: number;
    exp?: number;
  }
}
