import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deletePoll } from '../api';
import { FC } from 'react';
import { useQueryClient, useMutation } from 'react-query';

type DeletePollButtonProps = {
  id: number
}

const DeletePollButton:FC<DeletePollButtonProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => deletePoll(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('polls');
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <Popconfirm
      placement="bottomRight"
      title='Are you sure to delete this poll?'
      okText='Yes'
      cancelText='No'
      onConfirm={handleDelete}
    >
      <Button>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
}

export default DeletePollButton;