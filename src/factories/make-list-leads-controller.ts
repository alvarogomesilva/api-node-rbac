import { ListLeadsController } from '../application/controllers/list-leads-controller';

export function makeListLeadsController() {
  return new ListLeadsController();
}
