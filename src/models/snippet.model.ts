import { buildSchema, modelOptions, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class InfoLink {
  @prop()
  link: string;

  @prop()
  description: string;
}

export interface Snippet extends Base { }
@modelOptions({
  schemaOptions: {
    // collection: 'Snippets',
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
export class Snippet extends TimeStamps {
  @prop()
  category: string;

  @prop()
  snippet: string;

  @prop()
  description: string;

  @prop({ type: () => [String] })
  tags: string[];

  @prop({ type: () => [InfoLink], _id: false })
  infoLinks: InfoLink[];
}

export const snippetSchema = buildSchema(Snippet);