import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Table, Spin, Alert, message, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import Layout from '../layout/Layout';

// Компонент OrdersTable для отображения и управления заказами
const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/get/orders'); // Эндпоинт для получения заказов
                setOrders(response.data.orders);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Таблица заказов
    const columns = [
        { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
        { title: 'User', dataIndex: 'user', key: 'user' },
        { title: 'Food Items', dataIndex: 'foodItems', key: 'foodItems' },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => handleDelete(record._id)}>Delete</Button>
            ),
        },
        {
            title: 'Update',
            dataIndex: 'update',
            key: 'update',
            render: (text, record) => (
                <Button type="primary" onClick={() => openModal(record)}>Update</Button>
            ),
        },
    ];

    // Открытие модального окна с текущими данными заказа
    const openModal = (order) => {
        setCurrentOrder(order);
        form.setFieldsValue({
            user: order.user,
            foodItems: order.foodItems,
            totalPrice: order.totalPrice,
            status: order.status,
        });
        setIsModalVisible(true);
    };

    // Обработка удаления заказа
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5050/api/delete/order/${id}`); // Эндпоинт для удаления заказа
            message.success(response?.data.message);
            setOrders(orders.filter(order => order._id !== id));
        } catch (error) {
            message.error('Failed to delete order');
        }
    };

    // Обработка обновления заказа
    const handleUpdate = async () => {
        setIsUpdating(true);
        const updatedOrder = { ...currentOrder, ...form.getFieldsValue() };

        try {
            const response = await axios.put(`http://localhost:5050/api/update/order/${currentOrder._id}`, updatedOrder); // Эндпоинт для обновления заказа
            message.success(response?.data.message);
            setOrders(orders.map(order => order._id === currentOrder._id ? updatedOrder : order));
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to update order');
        } finally {
            setIsUpdating(false);
        }
    };

    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Отображение ошибок
    if (error) {
        return <Alert message="Error" description={error} type="error" />;
    }

    return (
        <Layout>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table
                        pagination={false}
                        dataSource={orders}
                        columns={columns}
                        rowKey="orderId"
                    />
                    <Modal
                        title="Update Order"
                        visible={isModalVisible}
                        onOk={handleUpdate}
                        onCancel={handleCancel}
                        confirmLoading={isUpdating} // Показать индикатор загрузки во время обновления
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item label="User" name="user" rules={[{ required: true, message: 'User is required' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Food Items" name="foodItems" rules={[{ required: true, message: 'Food Items are required' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Total Price" name="totalPrice" rules={[{ required: true, message: 'Total Price is required' }]}>
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Status is required' }]}>
                                <Select>
                                    <Select.Option value="pending">Pending</Select.Option>
                                    <Select.Option value="completed">Completed</Select.Option>
                                    <Select.Option value="canceled">Canceled</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </Layout>
    );
};

export default OrdersTable;
