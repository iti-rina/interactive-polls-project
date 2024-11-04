import { List } from 'antd';
import { useEffect, useState } from 'react';
import { getAllPolls } from '../api';
import PollItem from './PollItem';
import type { PollValues } from '../../../shared';

const PollList = () => {
  const [polls, setPolls] = useState<PollValues[]>([]);

  useEffect(() => {
    getAllPolls().then(data => setPolls(data))
  }, [])


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