import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { env } from '../config/env';
import { InvalidCredentials } from '../errors/invalid-credencials';
import { prisma } from '../lib/prisma-client';

interface Input {
  email: string;
  password: string;
}

interface Output {
  accessToken: string;
}

export class LoginAccountUseCase {
  async execute({ email, password }: Input): Promise<Output> {

    const account = await prisma.account.findUnique({
      where: { email },
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      {
        sub: account.id,
        role: account.roleId,
      },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    return {
      accessToken,
    };
  }
}
