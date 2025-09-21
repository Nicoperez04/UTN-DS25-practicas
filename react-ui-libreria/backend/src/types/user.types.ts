// src/types/user.types.ts
export type UserRole = 'USER' | 'ADMIN';

export type UserData = {
    id: number;
    name?: string | null;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export type UsersListResponse = {
    users: UserData[];
    total: number;
    message?: string;
}

export type UserResponse = {
    user: UserData;
    message?: string;
}