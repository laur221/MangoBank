'use client';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('./dashboard');
    };

    return (
        <div>
            <div className="container">
                <div className="login-card">
                    <h1 className='textlogreg'>Login to Your Account</h1>
                    <p className='hellotext'>Welcome back! Please enter your credentials to access your account.</p>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />

                        <div className="checkbox-group-login">
                            <div>
                                <Checkbox defaultSelected color="warning"/>
                                <span className='spanlog'>Remember me</span>
                            </div>
                            <a className="forgot" href="#">Forgot password?</a>
                        </div>

                        <button className='button' type="submit" href="./dashboard">Login</button>
                    </form>
                    <div className="register">
                        <p>Don't have an account? <Link href="./register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}