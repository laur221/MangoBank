'use client';
import './login.css';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div>
            <div className="container">
                <div className="login-card">
                    <h1 className='textlogreg'>Login to Your Account</h1>
                    <p className='hellotext'>Welcome back! Please enter your credentials to access your account.</p>
                    <form id="loginForm">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />

                        <div className="form-group">
                            <label className='remember'>
                                <input type="checkbox" id="remember-me" /><p>Remember me</p>
                            </label>
                            <a className="forgot" href="#">Forgot password?</a>
                        </div>

                        <button type="submit">Login</button>
                    </form>
                    <div className="register">
                        <p>Don't have an account? <Link href="../register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}