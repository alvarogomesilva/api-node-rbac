import { LoginAccountUseCase } from '../application/use-cases/login-account-use-case';

export function makeLoginAccountUseCase() {
  return new LoginAccountUseCase();
}
