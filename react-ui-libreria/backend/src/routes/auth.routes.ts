// src/routes/auth.routes.ts
import { Router } from 'express';
import { loginController } from '../controllers/auth.controller';
import { loginSchema } from '../validations/auth.validation';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.post('/login', validate(loginSchema), loginController);

export default router;