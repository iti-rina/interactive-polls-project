import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.poll.findMany({
      include: {
        answers: true
      }
    })
  }

  createPoll(pollDto: CreatePollDto) {
    return this.prisma.poll.create({
      data: {
        text: pollDto.text,
        total_votes: 0,
        answers: {
          create: pollDto.answers.map(answer => ({
            text: answer.text,
            votes_for_answer: 0
          }))
        }
      }
    })
  }
}
