import { Router } from 'express';
import { getAllUserNames } from './user.controller';

const router = Router();

// /api/users/getAllUserNames
router.get('/getAllUserNames', getAllUserNames);

export default router;
