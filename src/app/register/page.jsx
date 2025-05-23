'use client';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('./dashboard');
    };

    return (
        <div>
            <div className="container">
                <div className="login-card">
                    <h1 className='textlogreg'>Create Your Account</h1>
                    <p className='hellotext'>Join MangoBank today and take control of your finances.</p>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <label htmlFor="username">Full Name</label>
                        <input type="text" id="username" placeholder="Enter your username" required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Confirm your password" required />

                        <div className="checkbox-group">
                            <Checkbox defaultSelected color="warning" required/>
                            <span className='spanreg'>I agree to the Terms & Conditions</span>
                        </div>

                        <button className='button' type="submit" href="./dashboard">Register</button>
                    </form>
                    <div className="login">
                        <p>Already have an account? <Link href="./login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}