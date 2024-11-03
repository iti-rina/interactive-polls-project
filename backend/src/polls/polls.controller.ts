import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PollsService } from './polls.service';

@Controller('api/polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  // GET /api/polls - Получить список всех опросов.
  @Get()
  findAll() {
    return []
  }

  // POST /api/polls - Создать новый опрос.
  @Post()
  create(@Body() poll: {}) {
    return poll
  }

  // POST /api/polls/:id/vote - Проголосовать за один из вариантов в опросе по его ID.
  @Post(':id/vote')
  vote(@Param('id') id: number, @Body() vote: {}) {
    return vote
  }

  // DELETE /api/polls/:id - Удалить опрос по его ID.
  @Delete(':id')
  delete(@Param('id') id: number) {
    return id
  }
}
