import { FC, useState } from 'react';
import { List, Button } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import type { PollValues } from '../../../shared';
import { sendVote } from '../../vote/api';
import { VoteModal } from '../../vote/ui';
import { DeletePollButton } from '../../delete-poll/ui';

type PollItemValues = {
  pollData: PollValues;
}

const PollItem:FC<PollItemValues> = ({ pollData }) => {
  const [voteFormOpen, setVoteFormOpen] = useState(false);
  
  const handleClickOnItem = () => {
    setVoteFormOpen(true);
  }

  const handleCancel = () => {
    setVoteFormOpen(false);
  };

  const handleVote = (pollId: number, answerId: number) => {
    sendVote(pollId, answerId, 'INCREMENT');
    setVoteFormOpen(false);
  };

  let stringVotesCount = '';
  if (pollData.total_votes === 0) {
    stringVotesCount = 'Your vote will be the first';
  } else if (pollData.total_votes === 1) {
    stringVotesCount = 'One person voted';
  } else {
    stringVotesCount = `${pollData.total_votes} people voted`
  }

  return (
    <>
      <List.Item
        actions={[<Button ><SelectOutlined /></Button>]}
        onClick={handleClickOnItem}
      >
        <List.Item.Meta 
          title={pollData.text}
          description={stringVotesCount}
        />
        <DeletePollButton id={pollData.id}/>
      </List.Item>
      <VoteModal
        visible={voteFormOpen}
        onCancel={handleCancel}
        onVote={handleVote}
        pollData={pollData}
      />
    </>
  );
}

export default PollItem;
