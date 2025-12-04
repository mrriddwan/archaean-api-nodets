import { Router } from 'express';
import { userRoutes } from '../features/user';
import { authRoutes } from '@/features/auth/auth.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export const routes = router;