import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAnswerDto {
  @IsString()
  text: string;
}

export class CreatePollDto {
  @IsString()
  text: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  answers: string[];
}