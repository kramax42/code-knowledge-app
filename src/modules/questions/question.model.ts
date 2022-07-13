import { buildSchema, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Answer {
  @prop()
  answer: string;

  @prop()
  isCorrect: boolean;
}

export interface QuestionModel extends Base { }
export class QuestionModel extends TimeStamps {
  @prop()
  category: string;

  @prop()
  question: string;

  @prop()
  codeExample: string;

  @prop({ type: () => [Answer], _id: false })
  answers: Answer[];
}

export const questionSchema = buildSchema(QuestionModel);