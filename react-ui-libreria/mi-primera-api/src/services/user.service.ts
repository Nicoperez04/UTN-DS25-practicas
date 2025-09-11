import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import type { UserData } from '../types/user.types';
import type { CreateUserBody, UpdateUserBody } from '../validations/auth.validation';

const userSafeSelect = {
  id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true,
} as const;

export async function getAllUsers(limit = 10, skip = 0): Promise<UserData[]> {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
    take: limit,
    skip,
    select: userSafeSelect,
  });
  return users;
}

export async function countUsers(): Promise<number> {
  return prisma.user.count();
}

export async function getUserById(id: number): Promise<UserData> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSafeSelect,
  });
  if (!user) {
    const e: any = new Error('Usuario no encontrado');
    e.statusCode = 404;
    throw e;
  }
  return user;
}

export async function createUser(data: CreateUserBody): Promise<UserData> {
  // 1) evitar duplicados
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) {
    const e: any = new Error('Email ya registrado');
    e.statusCode = 409;
    throw e;
  }
  // 2) hash
  const hash = await bcrypt.hash(data.password, 10);

  // 3) crear
  const user = await prisma.user.create({
    data: { email: data.email, name: data.name, passwordHash: hash, role: data.role ?? 'USER' },
    select: userSafeSelect,
  });
  return user;
}

export async function updateUser(id: number, data: UpdateUserBody): Promise<UserData> {
  try {
    const toUpdate: any = {};
    if (data.email) toUpdate.email = data.email;
    if (data.name)  toUpdate.name  = data.name;
    if (data.role)  toUpdate.role  = data.role;
    if (data.password) {
      toUpdate.passwordHash = await bcrypt.hash(data.password, 10);
    }
    const user = await prisma.user.update({
      where: { id },
      data: toUpdate,
      select: userSafeSelect,
    });
    return user;
  } catch (e: any) {
    if (e.code === 'P2025') { // not found
      const err: any = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    }
    if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
      const err: any = new Error('Email ya registrado');
      err.statusCode = 409;
      throw err;
    }
    throw e;
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const err: any = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    }
    throw e;
  }
}
