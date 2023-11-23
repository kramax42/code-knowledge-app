import { IsString, IsBoolean } from 'class-validator';

export class AnswerDto {
  @IsString()
  answer: string;

  @IsBoolean()
  isCorrect: boolean;
}
