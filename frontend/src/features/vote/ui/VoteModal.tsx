import { FC } from 'react';
import { Modal, Form, Typography, Radio, Space, Button } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { sendVote } from '../api';

interface Answer {
  id: number;
  text: string;
}

interface PollData {
  id: number;
  text: string;
  answers: Answer[];
}

interface PollVoteModalProps {
  visible: boolean;
  onCancel: () => void;
  pollData: PollData;
}

const VoteModal: FC<PollVoteModalProps> = ({ visible, onCancel, pollData }) => {
  const [form] = Form.useForm();

  const cancelVote = () => {
    form.resetFields();
    onCancel();
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(({ pollId, answerId }: { pollId: number; answerId: number }) => sendVote(pollId, answerId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('polls');
        form.resetFields();
        onCancel();
      }
    }
  );

  const sendVoteForm = () => {
    const formData = form.getFieldsValue();
    mutation.mutate({ pollId: pollData.id, answerId: formData.answerId });
  };

  return (
    <Modal
      open={visible}
      footer={[
        <Button key='cancel' onClick={cancelVote}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={() => form.submit()}>
          Send vote
        </Button>,
      ]}
      onCancel={cancelVote}
    >
      <Form form={form} onFinish={sendVoteForm}>
        <Typography.Title>{pollData.text}</Typography.Title>
        <Form.Item
          name='answerId'
          rules={[{ required: true, message: 'Please select an answer' }]}
        >
          <Radio.Group disabled={mutation.isLoading}>
            <Space direction='vertical'>
              {pollData.answers.map((answer) => (
                <Radio key={answer.id} value={answer.id}>
                  {answer.text}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VoteModal;
