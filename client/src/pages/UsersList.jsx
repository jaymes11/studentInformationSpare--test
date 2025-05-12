import { useEffect, useState } from 'react';
import { Table, Typography, Card, Tag } from 'antd';
import { getAllUsers } from '../services/api';

const { Title } = Typography;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (_, record) => (
        <span>
          {record.firstName} {record.middleName ? record.middleName + ' ' : ''}{record.lastName}
        </span>
      ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registered Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    }
  ];

  return (
    <div>
      <Title level={2}>Users List</Title>
      <Card>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
        />
      </Card>
    </div>
  );
};

export default UsersList; 