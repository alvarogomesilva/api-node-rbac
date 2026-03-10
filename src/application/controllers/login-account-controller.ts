import { ZodError, z } from 'zod';

import { InvalidCredentials } from '../errors/invalid-credencials';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { LoginAccountUseCase } from '../use-cases/login-account-use-case';

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class LoginAccountController implements IController {
  constructor(private readonly loginAccountUseCase: LoginAccountUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken } = await this.loginAccountUseCase.execute({ email, password });

      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid credentials.',
          },
        };
      }

      throw error;
    }
  }
}
