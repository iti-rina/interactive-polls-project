import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deletePoll } from '../api';
import { FC } from 'react';

type DeletePollButtonProps = {
  id: number
}

const DeletePollButton:FC<DeletePollButtonProps> = ({ id }) => {
  const handleDelete = () => {
    deletePoll(id)
  }

  return (
    <Button onClick={handleDelete}>
      <DeleteOutlined />
      Delete poll
    </Button>
  );
}

export default DeletePollButton;