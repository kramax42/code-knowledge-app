import { buildSchema, modelOptions, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { InfoLink, schemaOptions } from './common';

class Answer {
  @prop()
  answer: string;

  @prop()
  isCorrect: boolean;
}

export interface Question extends Base { }

@modelOptions({ schemaOptions })
export class Question extends TimeStamps {
  @prop()
  category: string;

  @prop()
  question: string;

  @prop()
  codeExample: string;

  @prop({ type: () => [Answer], _id: false })
  answers: Answer[];

  @prop({ type: () => [String], default: [] })
  tags: string[];

  @prop({ type: () => [InfoLink], _id: false, default: [] })
  infoLinks: InfoLink[];
}

export const questionSchema = buildSchema(Question);