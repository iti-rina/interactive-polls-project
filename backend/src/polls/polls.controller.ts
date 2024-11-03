import { Body, Controller, Delete, Get, Param, Post, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';

@Controller('api/polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  // GET /api/polls - Получить список всех опросов.
  @Get()
  findAll() {
    return this.pollsService.findAll()
  }

  // POST /api/polls - Создать новый опрос.
  @Post()
  create(@Body(ValidationPipe) pollDto: CreatePollDto) {
    return this.pollsService.createPoll(pollDto)
  }

  // POST /api/polls/:id/vote - Проголосовать за один из вариантов в опросе по его ID.
  @Post(':id/vote')
  vote(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) voteDto: VoteDto) {
    return this.pollsService.vote(id, voteDto)
  }

  // DELETE /api/polls/:id - Удалить опрос по его ID.
  @Delete(':id')
  delete(@Param('id') id: number) {
    return id
  }
}
