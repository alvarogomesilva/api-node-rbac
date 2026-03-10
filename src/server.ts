import 'dotenv/config';
import express from 'express';

import { routeAdapter } from './adapters/route-adpter';

import { makeAuthorizationMiddleware } from './factories/make-authorization-middleware';
import { makeListLeadsController } from './factories/make-list-leads-controller';
import { makeLoginAccountController } from './factories/make-login-account-controller';
import { makeCreateAccountController } from './factories/make-create-account-controller';
import { middlewareAdapter } from './adapters/middleware-adapter';
import { makeAuthenticationMiddleware } from './factories/make-authentication-middleware';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeLoginAccountController()));
app.post('/sign-in', routeAdapter(makeCreateAccountController()));

app.get('/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.post('/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
  async (req, res) => res.json({ created: true }),
);

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
});
