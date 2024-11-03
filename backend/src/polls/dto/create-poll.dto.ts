import { IsString, IsInt, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAnswerDto {
  @IsString()
  text: string;
}

export class CreatePollDto {
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}