import { buildSchema, modelOptions, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Answer {
  @prop()
  answer: string;

  @prop()
  isCorrect: boolean;
}

export interface QuestionModel extends Base { }

@modelOptions({
  schemaOptions: {
    // collection: 'questions',
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
})
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