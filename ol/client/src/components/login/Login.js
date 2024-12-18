import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5050/api/signin/user', data);
            const { token } = response.data;

            if (token) {
                // Tokenni localStorage ga saqlash
                localStorage.setItem('token', token);

                // Login muvaffaqiyatli bo'lsa, /users ga yo'naltirish
                navigate('/users');
            }
        } catch (error) {
            setErrorMessage('Login failed: Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
