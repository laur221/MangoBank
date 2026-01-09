'use client';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            router.push('./dashboard');
        } catch (err) {
            toast.error(err.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="container">
                <div className="login-card">
                    <h1 className='textlogreg'>Login to Your Account</h1>
                    <p className='hellotext'>Welcome back! Please enter your credentials to access your account.</p>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required />

                        <div className="checkbox-group-login">
                            <div>
                                <Checkbox defaultSelected color="warning"/>
                                <span className='spanlog'>Remember me</span>
                            </div>
                            <a className="forgot" href="#">Forgot password?</a>
                        </div>

                        <button className='button' type="submit">Login</button>
                    </form>
                    <div className="register">
                        <p>Don't have an account? <Link href="./register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}