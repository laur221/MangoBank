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
                <section>
                    <div className="hero-content">
                        <h1>Welcome to <span>MangoBank</span></h1>
                        <h2>Banking Mage Simple</h2>
                        <p>Manage your finances easily with our modern banking solutions.</p>
                        <div className="hero-buttons">
                            <a href="#" className="btn-start">Get Started</a>
                            <a href="#" className="btn-learn">Learn More</a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
