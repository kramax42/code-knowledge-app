import { buildSchema, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface User extends Base { };
export class User extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  name: string;

  @prop({ type: String, enum: Role, default: Role.User })
  role: Role;

  @prop()
  passwordHash: string;
}

export const userSchema = buildSchema(User);