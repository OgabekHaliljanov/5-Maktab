import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ReadUsers.css";
import { Table, Spin, Alert, message, Button, Modal, Form, Input } from 'antd';
import Layout from '../layout/Layout';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/get/user');
                setUsers(response.data.innerData);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Jadval ustunlari
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => handleDelete(record._id)}>D</Button>
            ),
        },
        {
            title: 'Update',
            dataIndex: 'update',
            key: 'update',
            render: (text, record) => (
                <Button type="primary" onClick={() => opentModel(record)}>Update</Button>
            ),
        },
    ];

    const opentModel = (user) => {
        setCurrentUser(user);
        form.setFieldValue({
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
        })
        setIsModalVisible(true);
    }

    // userni serverdan o'chirish
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5050/api/delete/${id}`
        ).then((response) => {
            message.success(response?.data.message);
            setUsers(users.filter(user => user._id !== id));
        })
    }

    // user malumotlarini o'zgartrish
    const handleUpdate = async () => {
        const updatedUser = {
            ...currentUser,
            ...form.getFieldValue(),
        }

        await axios.put(`http://localhost:5050/api/update/${currentUser?._id}`, updatedUser)
            .then((response) => {
                message.success(response?.data.message);
                setUsers(users.map(user => user._id === currentUser?._id ? updatedUser : user));
                setIsModalVisible(false);
            })
    }

    const handleCensel = () => {
        setIsModalVisible(false);
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" />;
    }

    return (
        <Layout>
            {
                loading ?
                    <Spin size="large" />
                    :
                    <>
                        <Table pagination={false} dataSource={users} columns={columns} rowKey="username" />
                        <Modal
                            title="Update user"
                            open={isModalVisible}
                            onOk={handleUpdate}
                            onCancel={handleCensel}

                        >
                            <Form form={form} >
                                <Form.Item label="Username" name="username">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Password" name="password">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="FirstName" name="firstName">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="lastName" name="lastName">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="dateOfBirth" name="dateOfBirth">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="address" name="address">
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>
            }

        </Layout>
    )
};

export default UsersTable;


