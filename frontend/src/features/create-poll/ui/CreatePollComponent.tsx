import { FC } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from 'react-query';
import { createNewPoll } from '../api';
import type { CreatePollValues } from '../../../shared';

type CreatePollComponentProps = {
  isOpen: boolean;
  onCancel: () => void;
}

const CreatePollComponent:FC<CreatePollComponentProps> = ({ isOpen, onCancel }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation(createNewPoll, {
    onSuccess: () => {
      queryClient.invalidateQueries('polls');
      onCancel();
      form.resetFields();
    },
  });

  const handleFinish = (pollData: CreatePollValues) => {
    mutation.mutate(pollData);
  };

  return (
    <Modal
      open={isOpen}
      title='Create new poll'
      onCancel={onCancel}
      footer={[
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        initialValues={{
          answers: ['', ''],
        }}
      >
        <Form.Item
          name='text'
          label='Question'
          rules={[{ required: true, message: 'Please enter title for the poll' }]}
        >
          <Input placeholder='Enter your question' />
        </Form.Item>

        <Form.List name='answers'>
        
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space key={index} direction='vertical' size='middle' style={{ display: 'flex' }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'baseline'}}>
                  <Form.Item
                    name={[field.name]}
                    label={index === 0 ? 'Answers' : ''}
                    rules={[{ required: true, message: 'Please fill in or delete the field' }]}
                    style={{flexGrow: '1'}}
                    tooltip={index === 0 ? { title: 'Two variants at least', icon: <InfoCircleOutlined /> }: ''}
                  >
                    <Input placeholder={`Answer ${index + 1}`} />
                  </Form.Item>
                  {fields.length > 2 && (
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      style={{ color: 'red' }}
                    />
                  )}
                  </div>
                </Space>
              ))}
              {fields.length < 10 && (
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Answer
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}

export default CreatePollComponent;
