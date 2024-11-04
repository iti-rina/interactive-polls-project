import { Modal, Progress, Typography } from 'antd';
import type { PollValues } from '../../../shared';
import { FC } from 'react';

type SeeResultsProps = {
  visible: boolean;
  pollData: PollValues
}
const SeeResultsComponent:FC<SeeResultsProps> = ({ visible, pollData }) => {
  const graphics = pollData.answers.map(answer => {
    const percent = calculatePercentage(pollData.total_votes, answer.votes_for_answer);
    return (
      <div>
        <Typography.Text>{answer.text}</Typography.Text>
        <Progress percent={percent} />
      </div>
    );
  })
  return (
    <Modal
      open={visible}
    >
      {graphics}
    </Modal>
  );
}

function calculatePercentage(total: number, forItem: number) {
  return Math.ceil(forItem * 100 / total);
}

export default SeeResultsComponent;