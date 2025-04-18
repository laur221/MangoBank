export default function Home() {
    return (
        <div className="body">
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
                    <div class="feature-cards">
                        <div class="feature-card">
                            <i class="fas fa-user-plus fa-3x"></i>
                            <h3>Easy Registration</h3>
                            <p>Create your account in minutes with our simple registration process.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-wallet fa-3x"></i>
                            <h3>Balance Tracking</h3>
                            <p>Monitor your account balance in real-time with our intuitive dashboard.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-exchange-alt fa-3x"></i>
                            <h3>Quick Transfers</h3>
                            <p>Transfer money to other accounts instantly with just a few clicks.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-shield-alt fa-3x"></i>
                            <h3>Secure Banking</h3>
                            <p>Your financial data is protected with our state-of-the-art security measures.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
