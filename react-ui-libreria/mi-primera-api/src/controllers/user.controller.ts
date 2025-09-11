import type { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import type { CreateUserBody, UpdateUserBody } from '../validations/auth.validation';

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = Number(req.query.limit ?? 10);
    const page  = Number(req.query.page ?? 1);
    const skip  = (page - 1) * limit;

    const [users, total] = await Promise.all([
      userService.getAllUsers(limit, skip),
      userService.countUsers(),
    ]);

    res.json({ users, total, page, limit, message: 'Users retrieved successfully' });
  } catch (error) { next(error); }
}

export async function getUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);
    res.json({ user, message: 'User retrieved successfully' });
  } catch (error) { next(error); }
}

export async function createUser(
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) { next(error); }
}

export async function updateUser(
  req: Request<{ id: string }, {}, UpdateUserBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.updateUser(id, req.body);
    res.json({ user, message: 'User updated successfully' });
  } catch (error) { next(error); }
}

export async function deleteUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    await userService.deleteUser(id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) { next(error); }
}
