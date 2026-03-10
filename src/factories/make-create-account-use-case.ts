import { CreateAccountUseCase } from '../application/use-cases/create-account-use-case';

export function makeCreateAccountUseCase() {
  const SALT = 10;

  return new CreateAccountUseCase(SALT);
}
