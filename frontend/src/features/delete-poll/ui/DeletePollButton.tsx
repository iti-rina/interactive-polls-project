import { Button, Popconfirm } from 'antd';
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
    <Popconfirm
      placement="bottomRight"
      title='Are you sure to delete this poll?'
      okText='Yes'
      cancelText='No'
      onConfirm={handleDelete}
    >
      <Button>
        <DeleteOutlined />
        Delete poll
      </Button>
    </Popconfirm>
  );
}

export default DeletePollButton;