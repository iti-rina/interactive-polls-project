import { IsString, IsInt, ValidateNested, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAnswerDto {
  @IsString()
  text: string;

  @IsInt()
  @Min(0)
  votes_for_answer: number;
}

export class CreatePollDto {
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];

  @IsInt()
  @Min(0)
  total_votes: number;
}