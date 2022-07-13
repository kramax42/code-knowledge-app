import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionModel, questionSchema } from './question.model';
import { QuestionsService } from './questions.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [QuestionsController],
  imports: [
    MongooseModule.forFeature([{ name: QuestionModel.name, schema: questionSchema }]),
  ],
  providers: [QuestionsService],
})
export class QuestionsModule {}
