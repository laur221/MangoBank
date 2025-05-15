export default function Home() {
    return (
        <div>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <i className="fas fa-university"></i>
                        <h1>MangoBank</h1>
                    </div>
                    <ul className="nav-links">
                        <li><a className="nav-buttons" href="#hero">Home</a></li>
                        <li><a className="nav-buttons" href="#features">Features</a></li>
                        <li><a className="nav-buttons" href="#about">About Us</a></li>
                        <li><a className="nav-buttons" href="#contact">Contact</a></li>
                    </ul>
                    <div className="auth-buttons">
                        <a href="#" className="btn btn-login">Login</a>
                        <a href="#" className="btn btn-register">Register</a>
                    </div>
                </nav>
            </header>
            <main>
                <section className="hero-content">
                    <div>
                        <h1>Welcome to <span>MangoBank</span></h1>
                        <h2>Banking Mage Simple</h2>
                        <p>Manage your finances easily with our modern banking solutions.</p>
                        <div className="hero-buttons">
                            <a href="#" className="btn-start">Get Started</a>
                            <a href="#" className="btn-learn">Learn More</a>
                        </div>
                    </div>
                </section>
                <section className="features">
                    <h2 className="features-text">Our Features</h2>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <i className="fas fa-user-plus fa-3x"></i>
                            <h3>Easy Registration</h3>
                            <p>Create your account in minutes with our simple registration process.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-wallet fa-3x"></i>
                            <h3>Balance Tracking</h3>
                            <p>Monitor your account balance in real-time with our intuitive dashboard.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-exchange-alt fa-3x"></i>
                            <h3>Quick Transfers</h3>
                            <p>Transfer money to other accounts instantly with just a few clicks.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-shield-alt fa-3x"></i>
                            <h3>Secure Banking</h3>
                            <p>Your financial data is protected with our state-of-the-art security measures.</p>
                        </div>
                    </div>
                </section>
                <section id="about" className="about">
                    <h2 className="about-title">About MangoBank</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>MangoBank is a modern banking solution designed to make financial management simple and accessible to everyone.<br></br> Our platform provides a seamless banking experience with cutting-edge technology.</p>
                            <p>Founded with the vision of revolutionizing traditional banking, we strive to offer innovative services that cater <br></br>to the evolving needs of our customers.</p>
                        </div>
                    </div>
                </section>
                <section id="contact" className="contact">
                    <h2 className="contact-title">Contact Us</h2>
                    <div className="contact-container">
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>Str. Puskin 38</p>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <p>+373 69-469-917</p>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <p>info@mangobank.com</p>
                            </div>
                        </div>
                        <form className="contact-form">
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" required></input>
                            </div>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required></input>
                            </div>
                            <div className="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </section>
                <section className="footer">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h2><i className="fas fa-university"></i> MangoBank</h2>
                            <p>Banking Made Simple</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-column">
                                <h3>Quick Links</h3>
                                <ul>
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3>Banking</h3>
                                <ul>
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="register.html">Register</a></li>
                                    <li><a href="#">Personal Banking</a></li>
                                    <li><a href="#">Business Banking</a></li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3>Legal</h3>
                                <ul>
                                    <li><a href="#">Terms of Service</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Security</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; <span id="current-year"></span> MangoBank. All rights reserved.</p>
                        <div className="social-icons">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
