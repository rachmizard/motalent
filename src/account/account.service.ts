import { Injectable } from '@nestjs/common';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class AccountService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
