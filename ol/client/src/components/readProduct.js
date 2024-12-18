import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, message, Button, Modal, Form, Input } from 'antd';
import Layout from './layout/Layout';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentProduct, setCurrentProduct] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/getProducts');
                setProducts(response.data.innerData);
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    
    // Table columns
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Minus',
            dataIndex: 'minus',
            key: 'minus',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => handleMinus(record._id)}>Minus</Button>
            ),
        },
        {
            title: 'Plus',
            dataIndex: 'plus',
            key: 'plus',
            render: (text, record) => (
                <Button type="primary" onClick={() => handlePlus(record._id)}>Plus</Button>
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
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => handleDelete(record._id)}>Delete</Button>
            ),
        },
    ];

    // Function to handle product quantity increase
    const handlePlus = async (id) => {
        const updatedProducts = products.map(product => {
            if (product._id === id) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
        await updateProductQuantity(id, updatedProducts.find(product => product._id === id).quantity);
    };

    // Function to handle product quantity decrease
    const handleMinus = async (id) => {
        const updatedProducts = products.map(product => {
            if (product._id === id && product.quantity > 0) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
        await updateProductQuantity(id, updatedProducts.find(product => product._id === id).quantity);
    };

    // Function to update product quantity in the database
    const updateProductQuantity = async (id, newQuantity) => {
        try {
            await axios.put(`http://localhost:5050/api/updateProducts/:id/${id}`, { quantity: newQuantity });
            message.success('Product quantity updated successfully');
        } catch (error) {
            message.error('Failed to update product quantity');
        }
    };

    const openModal = (product) => {
        setCurrentProduct(product);
        form.setFieldsValue({
            productName: product.productName,
            price: product.price,
            description: product.description,
            category: product.category,
        });
        setIsModalVisible(true);
    };

    // Delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5050/api/deleteProducts/:id/${id}`);
            message.success('Product deleted successfully');
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            message.error('Failed to delete product');
        }
    };

    // Update product information
    const handleUpdate = async () => {
        const updatedProduct = {
            ...currentProduct,
            ...form.getFieldsValue(),
        };

        try {
            await axios.put(`http://localhost:5050/api/updateProducts/:id/${currentProduct._id}`, updatedProduct);
            message.success('Product updated successfully');
            setProducts(products.map(product => product._id === currentProduct._id ? updatedProduct : product));
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to update product');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (error) {
        return <Alert message="Error" description={error} type="error" />;
    }
    

    return (
        <Layout>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table pagination={false} dataSource={products} columns={columns} rowKey="_id" />
                    <Modal
                        title="Update Product"
                        open={isModalVisible}
                        onOk={handleUpdate}
                        onCancel={handleCancel}
                    >
                        <Form form={form}>
                            <Form.Item label="Product Name" name="productName">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Price" name="price">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Description" name="description">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Category" name="category">
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </Layout>
    );
};

export default ProductsTable;
