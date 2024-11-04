import { QueryClient, QueryClientProvider } from 'react-query';
import { CreatePollComponent } from './features/create-poll/ui';
import { FloatButton } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { PollList } from './features/get-all-polls/ui';

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
      <PollList />
      <FloatButton 
        tooltip={<div>Create new poll</div>} 
        icon={<FormOutlined />}
        onClick={handleOpenModal}
      />
      <CreatePollComponent isOpen={isModalOpen} onCancel={handleCancel}/>
    </QueryClientProvider>
  );
}

export default App
