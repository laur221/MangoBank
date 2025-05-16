'use client';
import './register.css'

export default function Login() {
    return (
        <div>
            <div className="container">
                <div className="login-card">
                    <h1>Login to Your Account</h1>
                    <p>Welcome back! Please enter your credentials to access your account.</p>
                    <form id="loginForm">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />

                        <div className="form-group">
                            <label>
                                <input type="checkbox" id="remember-me" /> Remember me
                            </label>
                            <a className="forgot" href="#">Forgot password?</a>
                        </div>

                        <button type="submit">Login</button>
                    </form>
                    <div className="footer">
                        <p>Don't have an account? <a href="register.html">Register</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}