import { signin, signup, protectedRoute } from './auth';
import userRouter from '../resources/user/user.router';

function setRoutes(app: any): any {
  app.post('/auth/signin', signin);
  app.post('/auth/signup', signup);

  app.use('/api', protectedRoute);
  app.use('/api/users', userRouter);
}

export default setRoutes;
