import { FC, useState } from 'react';
import { List, Button } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import type { PollValues } from '../../../shared';


type PollItemValues = {
  pollData: PollValues;
}

const PollItem:FC<PollItemValues> = ({ pollData }) => {
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
      >
        <List.Item.Meta 
          title={pollData.text}
          description={stringVotesCount}
        />
      </List.Item>
    </>
  );
}

export default PollItem;
