'use client';
import Link from 'next/link';
import './register.css'

export default function Register() {
    return (
        <div>
            <div className="container">
                <div className="login-card">
                    <h1 className='textlogreg'>Create Your Account</h1>
                    <p className='hellotext'>Join MangoBank today and take control of your finances.</p>
                    <form id="loginForm">
                        <label htmlFor="username">Full Name</label>
                        <input type="username" id="username" placeholder="Enter your username" required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="passwordrepeat" id="confirm-password" placeholder="Confirm your password" required />

                        <div className="form-group">
                            <label className='remember'>
                                <input type="checkbox" id="remember-me" /><p>I agree to the Terms & Conditions</p>
                            </label>
                        </div>

                        <button type="submit">Register</button>
                    </form>
                    <div className="login">
                        <p>Already have an account? <Link href="../login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}