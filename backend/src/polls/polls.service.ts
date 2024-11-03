import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { VoteDto } from './dto/vote.dto';

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

  async vote(id: number, voteDto: VoteDto) {
    let voteOperation = null;
    if (voteDto.action === 'INCREMENT') {
      voteOperation = 1;
    }
    if (voteDto.action === 'DECREMENT') {
      voteOperation = -1;
    }
  
    await this.prisma.answer.update({
      where: { id: voteDto.answer_id },
      data: { votes_for_answer: { increment: voteOperation }}
    })
  
    const totalVotes = await this.prisma.answer.aggregate({
      where: { pollId: id },
      _sum: { votes_for_answer: true },
    });
  
    return this.prisma.poll.update({
      where: { id: id },
      data: { total_votes: totalVotes._sum.votes_for_answer || 0 },
    });
  }
}
