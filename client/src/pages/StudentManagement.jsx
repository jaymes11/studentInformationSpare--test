import { useState, useEffect } from 'react';
import { 
  Typography, 
  Button, 
  Table, 
  Space, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  Select, 
  Popconfirm,
  message,
  Card
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SearchOutlined 
} from '@ant-design/icons';
import { 
  getAllStudents, 
  createStudent, 
  updateStudent,
  deleteStudent 
} from '../services/api';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      message.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    form.setFieldsValue({
      ...student,
      dateOfBirth: student.dateOfBirth ? dayjs(student.dateOfBirth) : null
    });
    setModalVisible(true);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      message.error('Failed to delete student');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Format date
      if (values.dateOfBirth) {
        values.dateOfBirth = values.dateOfBirth.toISOString();
      }
      
      if (editingStudent) {
        // Update existing student
        await updateStudent(editingStudent._id, values);
        message.success('Student updated successfully');
      } else {
        // Create new student
        await createStudent(values);
        message.success('Student created successfully');
      }
      
      setModalVisible(false);
      fetchStudents();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <span>
          {record.firstName} {record.middleName ? record.middleName + ' ' : ''}{record.lastName}
        </span>
      ),
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Year Level',
      dataIndex: 'yearLevel',
      key: 'yearLevel',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEditStudent(record)}
            type="primary"
            size="small"
          />
          <Popconfirm
            title="Delete Student"
            description="Are you sure you want to delete this student?"
            onConfirm={() => handleDeleteStudent(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              icon={<DeleteOutlined />} 
              danger
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>Student Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddStudent}
        >
          Add Student
        </Button>
      </div>

      <Card>
        <Table 
          columns={columns} 
          dataSource={students} 
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Student Form Modal */}
      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        open={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalSubmit}
        width={600}
      >
        <Form 
          form={form} 
          layout="vertical"
          initialValues={{ gender: 'Male' }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="middleName"
            label="Middle Name"
          >
            <Input placeholder="Middle Name (optional)" />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select date of birth' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select placeholder="Select Gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: 'Please enter course' }]}
          >
            <Input placeholder="Course" />
          </Form.Item>

          <Form.Item
            name="yearLevel"
            label="Year Level"
            rules={[{ required: true, message: 'Please enter year level' }]}
          >
            <Select placeholder="Select Year Level">
              <Option value={1}>1st Year</Option>
              <Option value={2}>2nd Year</Option>
              <Option value={3}>3rd Year</Option>
              <Option value={4}>4th Year</Option>
              <Option value={5}>5th Year</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement; 