import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5050/api/createProduct', data);
            alert('Product added successfully:', response.data);
            reset(); 
            navigate("/products"); 

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="productName">Product Name</label>
                    <input
                        id="productName"
                        {...register('productName', { required: 'Product Name is required' })}
                    />
                    {errors.productName && <p>{errors.productName.message}</p>}
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price', { required: 'Price is required' })}
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <p>{errors.description.message}</p>}
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        {...register('category', { required: 'Category is required' })}
                    />
                    {errors.category && <p>{errors.category.message}</p>}
                </div>

                <button type="submit">Add Product</button>
            </form>
        </Layout>
    );
};

export default AddProduct;
