import { prop } from '@typegoose/typegoose';

export class InfoLink {
  @prop()
  link: string;

  @prop()
  description: string;
}

export const schemaOptions = {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
};
