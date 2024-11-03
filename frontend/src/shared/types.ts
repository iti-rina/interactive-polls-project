export type AnswerValues = {
  'id': number;
  'text': string;
  'votes_for_answer': number;
  'pollId': number
}

export type PollValues = {
  'id': number;
  'text': string;
  'total_votes': number
  'answers': AnswerValues[]
}

export type CreatePollValues = {
  'text': string;
  'answers': string[]
}
