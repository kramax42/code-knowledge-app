import { IsString } from 'class-validator';

export class InfoLinkDto {
    @IsString()
    link: string;

    @IsString()
    description: string;
}
