import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// mock data to fill db
const polls = [
  {
    id: 1,
    question_text: "How satisfied are you with our service?",
    answers: [
      { id: 1, answer_text: "Very satisfied", votes_for_answer: 45 },
      { id: 2, answer_text: "Somewhat satisfied", votes_for_answer: 30 },
      { id: 3, answer_text: "Not satisfied", votes_for_answer: 25 },
    ],
    total_votes: 100,
  },
  {
    id: 2,
    question_text: "Would you recommend us to others?",
    answers: [
      { id: 1, answer_text: "Yes, definitely", votes_for_answer: 60 },
      { id: 2, answer_text: "Maybe", votes_for_answer: 25 },
      { id: 3, answer_text: "No", votes_for_answer: 15 },
    ],
    total_votes: 100,
  },
  {
    id: 3,
    question_text: "How often do you use our product?",
    answers: [
      { id: 1, answer_text: "Daily", votes_for_answer: 40 },
      { id: 2, answer_text: "Weekly", votes_for_answer: 35 },
      { id: 3, answer_text: "Rarely", votes_for_answer: 25 },
    ],
    total_votes: 100,
  },
  {
    id: 4,
    question_text: "How would you rate our customer support?",
    answers: [
      { id: 1, answer_text: "Excellent", votes_for_answer: 50 },
      { id: 2, answer_text: "Good", votes_for_answer: 30 },
      { id: 3, answer_text: "Poor", votes_for_answer: 20 },
    ],
    total_votes: 100,
  },
  {
    id: 5,
    question_text: "Is our product priced reasonably?",
    answers: [
      { id: 1, answer_text: "Yes", votes_for_answer: 55 },
      { id: 2, answer_text: "Somewhat", votes_for_answer: 30 },
      { id: 3, answer_text: "No", votes_for_answer: 15 },
    ],
    total_votes: 100,
  },
];

async function main() {
  for (let poll of polls) {
    const createdPoll = await prisma.poll.create({
      data: {
        text: poll.question_text,
        total_votes: poll.total_votes,
        answers: {
          create: poll.answers.map(answer => ({
            text: answer.answer_text,
            votes_for_answer: answer.votes_for_answer
          }))
        }
      }
    });
    console.log(`Created poll with id: ${createdPoll.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });