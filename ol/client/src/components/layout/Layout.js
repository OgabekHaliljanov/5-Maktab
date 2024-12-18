import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    // Функция отправки формы (добавление нового заказа)
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5050/api/create/order', data);
            alert('Success:', response.data); // Вывод сообщения об успешном добавлении
            reset(); // Сброс формы после отправки
            navigate("/orders"); // Перенаправление на страницу заказов

        } catch (error) {
            console.error('Error:', error);
            alert('Error while creating order');
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Поле для имени клиента */}
                <div>
                    <label htmlFor="userName">Client Name</label>
                    <input
                        id="userName"
                        {...register('userName', { required: 'Client name is required' })}
                    />
                    {errors.userName && <p>{errors.userName.message}</p>}
                </div>

                {/* Поле для выбора блюд */}
                <div>
                    <label htmlFor="foodItems">Food Items</label>
                    <select
                        id="foodItems"
                        {...register('foodItems', { required: 'Food items are required' })}
                    >
                        <option value="burger">Burger</option>
                        <option value="pizza">Pizza</option>
                        <option value="fries">Fries</option>
                        <option value="salad">Salad</option>
                    </select>
                    {errors.foodItems && <p>{errors.foodItems.message}</p>}
                </div>

                {/* Поле для количества блюд */}
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        {...register('quantity', { required: 'Quantity is required', min: 1 })}
                    />
                    {errors.quantity && <p>{errors.quantity.message}</p>}
                </div>

                {/* Поле для выбора напитков */}
                <div>
                    <label htmlFor="drink">Drink</label>
                    <select
                        id="drink"
                        {...register('drink', { required: 'Drink selection is required' })}
                    >
                        <option value="coke">Coke</option>
                        <option value="sprite">Sprite</option>
                        <option value="water">Water</option>
                        <option value="juice">Juice</option>
                    </select>
                    {errors.drink && <p>{errors.drink.message}</p>}
                </div>

                {/* Поле для даты заказа */}
                <div>
                    <label htmlFor="orderDate">Order Date</label>
                    <input
                        id="orderDate"
                        type="date"
                        {...register('orderDate', { required: 'Order date is required' })}
                    />
                    {errors.orderDate && <p>{errors.orderDate.message}</p>}
                </div>

                {/* Поле для общей стоимости заказа */}
                <div>
                    <label htmlFor="totalPrice">Total Price</label>
                    <input
                        id="totalPrice"
                        type="number"
                        {...register('totalPrice', { required: 'Total price is required', min: 1 })}
                    />
                    {errors.totalPrice && <p>{errors.totalPrice.message}</p>}
                </div>

                {/* Поле для статуса заказа */}
                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        {...register('status', { required: 'Order status is required' })}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                    {errors.status && <p>{errors.status.message}</p>}
                </div>

                {/* Кнопка для отправки формы */}
                <button type="submit">Create Order</button>
            </form>
        </Layout>
    );
};

export default AddOrder;
