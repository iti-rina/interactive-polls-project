import { List } from 'antd';
import { FC } from 'react';
import { getAllPolls } from '../api';
import PollItem from './PollItem';
import { useQuery } from 'react-query';

const PollList:FC = () => {
  const { data: polls } = useQuery('polls', getAllPolls);

  return (
    <>
      <List
        dataSource={polls}
        renderItem={item => (
          <PollItem pollData={item} />
        )}
      />
    </>
  );
}

export default PollList;