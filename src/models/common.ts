import { prop } from '@typegoose/typegoose';

export class InfoLink {
    @prop()
    link: string;

    @prop()
    description: string;
}
