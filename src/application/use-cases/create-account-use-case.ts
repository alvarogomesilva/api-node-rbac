import { hash } from 'bcryptjs';

import { AccountAlreadyExists } from '../errors/account-alredy-exists';
import { prismaClient } from '../libs/prisma-client';

interface Input {
  name: string;
  email: string;
  password: string;
}


export class CreateAccountUseCase {
  constructor(private readonly salt: number) {}

  async execute({ email, name, password }: Input): Promise<void> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, this.salt);

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER',
      },
    });
  }
}
