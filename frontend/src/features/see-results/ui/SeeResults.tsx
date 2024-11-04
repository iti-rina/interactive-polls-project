import { Modal, Progress, Typography } from 'antd';
import type { PollValues } from '../../../shared';
import { FC } from 'react';

type SeeResultsProps = {
  visible: boolean;
  pollData: PollValues;
  onCancel: () => void;
}
const SeeResultsComponent:FC<SeeResultsProps> = ({ visible, pollData, onCancel }) => {
  const graphics = pollData.answers.map(answer => {
    const percent = calculatePercentage(pollData.total_votes, answer.votes_for_answer);
    return (
      <div key={answer.id}>
        <Typography.Text>{answer.text}: {answer.votes_for_answer}</Typography.Text>
        <Progress percent={percent} />
      </div>
    );
  })
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Typography.Title>{pollData.text}</Typography.Title>
      {graphics}
    </Modal>
  );
}

function calculatePercentage(total: number, forItem: number) {
  return Math.ceil(forItem * 100 / total);
}

export default SeeResultsComponent;