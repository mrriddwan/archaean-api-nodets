import { Router } from 'express';
import { userRoutes } from '../features/user';

const router = Router();

router.use('/users', userRoutes);
// router.use('/auth', authRoutes);
// router.use('/posts', postRoutes);

export const routes = router;