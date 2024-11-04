import { QueryClient, QueryClientProvider } from 'react-query';
import { CreatePollComponent } from './features/create-poll/ui';
import { FloatButton, Typography } from 'antd';
import { EditTwoTone, SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { PollList } from './features/get-all-polls/ui';
import styles from './App.module.css'

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(prev => !prev)
  }

  const handleCancel = () => {
    setModalOpen(false);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.wrapper}>
        <Typography.Title mark>Polls: Create Your Own or Share Your Opinion on Existing Questions <SmileOutlined /></Typography.Title>
        <PollList />
        <FloatButton 
          tooltip={<div>Create new poll</div>} 
          icon={<EditTwoTone twoToneColor='#ff8127'/>}
          onClick={handleOpenModal}
          className={styles.floatBtn}
        />
        <CreatePollComponent isOpen={isModalOpen} onCancel={handleCancel}/>
      </div>
    </QueryClientProvider>
  );
}

export default App
