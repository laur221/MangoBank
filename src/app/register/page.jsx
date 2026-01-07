'use client';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                }),
            });

            if (response.ok) {
                setMessage('User registered successfully!');
            } else {
                const error = await response.json();
                setMessage(error.message || 'Registration failed');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <div className="container">
                <div className="login-card">
                    <h1 className="textlogreg">Create Your Account</h1>
                    <p className="hellotext">Join MangoBank today and take control of your finances.</p>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <div className="checkbox-group">
                            <Checkbox defaultSelected color="warning" required />
                            <span className="spanreg">I agree to the Terms & Conditions</span>
                        </div>

                        <button className="button" type="submit">
                            Register
                        </button>
                    </form>
                    {message && <p>{message}</p>}
                    <div className="login">
                        <p>
                            Already have an account? <Link href="./login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}