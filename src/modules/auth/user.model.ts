import { buildSchema, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserModel extends Base { };
export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  name: string;

  @prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @prop()
  passwordHash: string;
}

export const userSchema = buildSchema(UserModel);