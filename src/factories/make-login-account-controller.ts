import { LoginAccountController } from '../application/controllers/login-account-controller';
import { makeLoginAccountUseCase } from './make-login-account-use-case';

export function makeLoginAccountController() {
  const loginAccountUseCase = makeLoginAccountUseCase();

  return new LoginAccountController(loginAccountUseCase);
}
