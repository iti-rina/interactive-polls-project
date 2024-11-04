import { FC, useState } from 'react';
import { List, Button, Tooltip, Space } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import type { PollValues } from '../../../shared';
import { sendVote } from '../../vote/api';
import { VoteModal } from '../../vote/ui';
import { DeletePollButton } from '../../delete-poll/ui';
import { SeeResultsComponent } from '../../see-results/ui';

type PollItemValues = {
  pollData: PollValues;
}

const PollItem:FC<PollItemValues> = ({ pollData }) => {
  const [voteFormOpen, setVoteFormOpen] = useState(false);
  
  const handleOpenVoteForm = () => {
    setVoteFormOpen(true);
  }

  const handleCancel = () => {
    setVoteFormOpen(false);
  };

  const handleVote = (pollId: number, answerId: number) => {
    sendVote(pollId, answerId, 'INCREMENT');
    setVoteFormOpen(false);
  };

  const [seeResultsOpen, setSeeResultsOpen] = useState(false);
  const handleSeeResultCancel = () => {
    setSeeResultsOpen(false);
  }

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
      <List.Item>
        <List.Item.Meta 
          title={pollData.text}
          description={stringVotesCount}
        />

        <Space>
          <Button onClick={handleOpenVoteForm}>
            Take part in a poll
          </Button>

          <Tooltip title='View results'>
            <Button onClick={() => setSeeResultsOpen(true)}><PieChartOutlined /></Button>
          </Tooltip>

          <DeletePollButton id={pollData.id} />
        </Space>




      </List.Item>
      <VoteModal
        visible={voteFormOpen}
        onCancel={handleCancel}
        onVote={handleVote}
        pollData={pollData}
      />
      <SeeResultsComponent pollData={pollData} visible={seeResultsOpen} onCancel={handleSeeResultCancel}/>
    </>
  );
}

export default PollItem;
