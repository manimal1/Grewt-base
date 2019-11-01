import express from 'express';

import { signin, signup, protectedRoute } from './auth';
import userRouter from '../resources/user/user.router';

function routesController(app: any): any {
  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('/ endpoint works!');
  });

  app.post('/signin', signin);
  app.post('/signup', signup);

  app.use('/api', protectedRoute);
  app.use('/api/users', userRouter);
}

export default routesController;
