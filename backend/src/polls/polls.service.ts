import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
