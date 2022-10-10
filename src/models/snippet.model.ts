import { buildSchema, modelOptions, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { InfoLink, schemaOptions } from './common';


export interface Snippet extends Base { }
@modelOptions({ schemaOptions })
export class Snippet extends TimeStamps {
  @prop()
  category: string;

  @prop()
  snippet: string;

  @prop()
  description: string;

  @prop({ type: () => [String], default: [] })
  tags: string[];

  @prop({ type: () => [InfoLink], _id: false, default: [] })
  infoLinks: InfoLink[];
}

export const snippetSchema = buildSchema(Snippet);