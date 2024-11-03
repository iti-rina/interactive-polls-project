-- CreateTable
CREATE TABLE "Poll" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "total_votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "votes_for_answer" INTEGER NOT NULL DEFAULT 0,
    "pollId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
