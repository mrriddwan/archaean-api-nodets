import { Router } from 'express';
import { userRoutes } from '../features/user';
import { authRoutes } from '@/features/auth/auth.routes';
import { cartRoutes } from '@/features/cart/cart.routes';
import { productRoutes } from '@/features/product/product.routes';
import { permissionRoutes } from '@/features/permission/permission.routes';
import { roleRoutes } from '@/features/role/role.routes';
import { orderRoutes } from '@/features/order/order.routes';
import { paymentRoutes } from '@/features/payment/payment.routes';
import { shopRoutes } from '@/features/shop/shop.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/carts', cartRoutes);
router.use('/products', productRoutes);
router.use('/permissions', permissionRoutes);
router.use('/roles', roleRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/shops', shopRoutes);

export const routes = router;