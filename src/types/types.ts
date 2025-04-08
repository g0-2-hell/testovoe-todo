import { UserDocument } from 'src/user/user.schema';

export type UserIdBody = { userId: string };
export type AuthRequest = Request & { user: UserDocument };