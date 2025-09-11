import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema } from '../validations/auth.validation';

const router = Router();

// Solo ADMIN accede a gestión de usuarios (como en las slides)
router.get('/',    authenticate, authorize('ADMIN'), userController.getAllUsers);
router.get('/:id', authenticate, authorize('ADMIN'), userController.getUserById);
router.post('/',   authenticate, authorize('ADMIN'), validate(createUserSchema), userController.createUser);
router.put('/:id', authenticate, authorize('ADMIN'), validate(updateUserSchema), userController.updateUser);
router.delete('/:id', authenticate, authorize('ADMIN'), userController.deleteUser);

export { router as userRoutes };
