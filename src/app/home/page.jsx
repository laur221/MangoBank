'use client';
import Link from 'next/link';
import TextField from '@mui/material/TextField';

export default function Home() {
    return (
        <div className='body'>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <i className="image fas fa-university"></i>
                        <h1 className='logo'>MangoBank</h1>
                    </div>
                    <ul className="ul nav-links">
                        <li><a className="link nav-buttons" href="#hero">Home</a></li>
                        <li><a className="link nav-buttons" href="#features">Features</a></li>
                        <li><a className="link nav-buttons" href="#about">About Us</a></li>
                        <li><a className="link nav-buttons" href="#contact">Contact</a></li>
                    </ul>
                    <div className="auth-buttons">
                        <Link href="./login" className="link btn btn-login">Login</Link>
                        <Link href="./register" className="link btn btn-register">Register</Link>
                    </div>
                </nav>
            </header>
            <main className='main'>
                <section id="hero" className="hero-content">
                    <div>
                        <h1 className='h1'>Welcome to <span className='span'>MangoBank</span></h1>
                        <h2 className='detail'>Banking Mage Simple</h2>
                        <p className='p'>Manage your finances easily with our modern banking solutions.</p>
                        <div className="hero-buttons">
                            <Link href="./login" className="link btn-start">Get Started</Link>
                            <a href="#features" className="link btn-learn">Learn More</a>
                        </div>
                    </div>
                </section>
                <section id="features" className="features">
                    <h2 className="features-text">Our Features</h2>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <i className="image fas fa-user-plus fa-3x"></i>
                            <h3 className='h3'>Easy Registration</h3>
                            <p className='p'>Create your account in minutes with our simple registration process.</p>
                        </div>
                        <div className="feature-card">
                            <i className="image fas fa-wallet fa-3x"></i>
                            <h3 className='h3'>Balance Tracking</h3>
                            <p className='p'>Monitor your account balance in real-time with our intuitive dashboard.</p>
                        </div>
                        <div className="feature-card">
                            <i className="image fas fa-exchange-alt fa-3x"></i>
                            <h3 className='h3'>Quick Transfers</h3>
                            <p className='p'>Transfer money to other accounts instantly with just a few clicks.</p>
                        </div>
                        <div className="feature-card">
                            <i className="image fas fa-shield-alt fa-3x"></i>
                            <h3 className='h3'>Secure Banking</h3>
                            <p className='p'>Your financial data is protected with our state-of-the-art security measures.</p>
                        </div>
                    </div>
                </section>
                <section id="about" className="about">
                    <h2 className="about-title">About MangoBank</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p className='p'>MangoBank is a modern banking solution designed to make financial management simple and accessible to everyone.<br></br> Our platform provides a seamless banking experience with cutting-edge technology.</p>
                            <p className='p'>Founded with the vision of revolutionizing traditional banking, we strive to offer innovative services that cater <br></br>to the evolving needs of our customers.</p>
                        </div>
                    </div>
                </section>
                <section id="contact" className="contact">
                    <h2 className="contact-title">Contact Us</h2>
                    <div className="contact-container">
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="image fas fa-map-marker-alt"></i>
                                <p className='p'>Str. Puskin 38</p>
                            </div>
                            <div className="contact-item">
                                <i className="image fas fa-phone"></i>
                                <p className='p'>+373 69-469-917</p>
                            </div>
                            <div className="contact-item">
                                <i className="image fas fa-envelope"></i>
                                <p className='p'>info@mangobank.com</p>
                            </div>
                        </div>
                        <form className="contact-form">
                            <div className="form-group">
                                <TextField className='form' id="name" label="Name" variant="standard" color="warning" type='text' placeholder='Enter your name' required />
                            </div>
                            <div className="form-group">
                                <TextField className='form' id="email" label="Email" variant="standard" color="warning" type='email' placeholder='Enter your name' required />
                            </div>
                            <div className="form-group">
                                <TextField
                                    className='form'
                                    id="message"
                                    label="Message"
                                    multiline
                                    rows={5}
                                    placeholder="Enter your message"
                                    variant="standard"
                                    color="warning"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </section>
            </main>
            <footer>
                <section className="footer">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h2 className='h2'>MangoBank</h2>
                            <p className='p'>Banking Made Simple</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-column">
                                <h3 className='h3'>Link</h3>
                                <ul className="ul">
                                    <li><a className="link" href="#hero">Home</a></li>
                                    <li><a className="link" href="#features">Features</a></li>
                                    <li><a className="link" href="#about">About Us</a></li>
                                    <li><a className="link" href="#contact">Contact</a></li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3 className='h3'>Banking</h3>
                                <ul className="ul">
                                    <li><Link className='link' href="./login">Login</Link></li>
                                    <li><Link className='link'  href="./register">Register</Link></li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3 className='h3'>Legal</h3>
                                <ul className="ul">
                                    <li><a className="link" href="#">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className='p'>&copy; <span id="current-year"></span> MangoBank. All rights reserved.</p>
                    </div>
                </section>
            </footer>
        </div>
    );
}
