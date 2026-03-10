import { CreateAccountController } from '../application/controllers/create-account-controller';
import { makeCreateAccountUseCase } from './make-create-account-use-case';

export function makeCreateAccountController() {
  const createAccountUseCase = makeCreateAccountUseCase();

  return new CreateAccountController(createAccountUseCase);
}
