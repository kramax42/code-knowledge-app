import { buildSchema, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface Category extends Base { };
export class Category extends TimeStamps {
  @prop({ unique: true })
  category: string;

  @prop()
  questionsAmount: number;

  @prop()
  snippetsAmount: number;
}

export const categorySchema = buildSchema(Category);