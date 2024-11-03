import { IsInt, IsEnum } from 'class-validator';

export class VoteDto {
  @IsInt()
  answer_id: number

  @IsEnum(['INCREMENT', 'DECREMENT'], {
    message: 'Valid action type is required'
  })
  action: 'INCREMENT' | 'DECREMENT'
}