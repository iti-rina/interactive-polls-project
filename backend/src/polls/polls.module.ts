import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PollsController],
  providers: [PollsService],
  imports: [PrismaModule],
})
export class PollsModule {}
