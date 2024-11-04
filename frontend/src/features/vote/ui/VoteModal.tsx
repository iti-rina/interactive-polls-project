import { FC } from 'react';
import { Modal, Form, Typography, Radio, Space, Button } from 'antd';

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
  onVote: (pollId: number, answerId: number) => void;
  pollData: PollData;
}

const VoteModal: FC<PollVoteModalProps> = ({ visible, onCancel, onVote, pollData }) => {
  const [form] = Form.useForm();

  const sendVoteForm = () => {
    const formData = form.getFieldsValue();
    onVote(pollData.id, formData.answerId);
    form.resetFields();
    onCancel();
  };

  const cancelVote = () => {
    form.resetFields();
    onCancel();
  }

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
          <Radio.Group>
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
