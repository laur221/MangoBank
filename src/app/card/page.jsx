'use client';
import Link from 'next/link';
import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function Card() {
    const [showDetails, setShowDetails] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showRequestModal, setShowRequestModal] = React.useState(false);
    const [cardNumber, setCardNumber] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState('');
    const [requestReason, setRequestReason] = React.useState('');
    const [animatedNumber, setAnimatedNumber] = React.useState('**** **** **** 2800');
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [isAddingCard, setIsAddingCard] = React.useState(false);
    const [isRequestingCard, setIsRequestingCard] = React.useState(false);
    
    const toggleDetails = () => {
        if (isAnimating) return;
        
        if (!showDetails) {
            setIsAnimating(true);
            setShowDetails(true);
            animateNumberReveal();
            setTimeout(() => setIsAnimating(false), 1500);
        } else {
            setShowDetails(false);
            setAnimatedNumber('**** **** **** 2800');
        }
    };

    const openModal = () => {
        if (isAddingCard) return;
        setShowModal(true);
    };

    const closeModal = () => {
        if (isAddingCard) return;
        setShowModal(false);
    };

    const openRequestModal = () => {
        if (isRequestingCard) return;
        setShowRequestModal(true);
    };

    const closeRequestModal = () => {
        if (isRequestingCard) return;
        setShowRequestModal(false);
        setRequestReason('');
    };

    const handleAddCard = async () => {
        if (isAddingCard) return;
        
        setIsAddingCard(true);
        
        setTimeout(() => {
            setIsAddingCard(false);
            setShowModal(false);
            setCardNumber('');
            setExpiryDate('');
        }, 2000);
    };

    const handleRequestCard = async () => {
        if (isRequestingCard) return;
        
        setIsRequestingCard(true);
        
        setTimeout(() => {
            setIsRequestingCard(false);
            setShowRequestModal(false);
            setRequestReason('');
        }, 2000);
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value;
        // Remove all non-digits
        value = value.replace(/\D/g, '');
        // Limit to 16 digits
        value = value.substring(0, 16);
        // Add spaces every 4 digits
        value = value.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(value);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            const month = value.substring(0, 2);
            const year = value.substring(2, 4);
            
            if (parseInt(month) > 12 || parseInt(month) === 0) {
                return;
            }
            
            value = month + (year ? '/' + year : '');
        }
        
        setExpiryDate(value);
    };

    const animateNumberReveal = () => {
        const finalNumber = '4532 1234 5678 2800';
        const steps = [
            '**** **** **** 2800',
            '4*** **** **** 2800',
            '45** **** **** 2800',
            '453* **** **** 2800',
            '4532 **** **** 2800',
            '4532 1*** **** 2800',
            '4532 12** **** 2800',
            '4532 123* **** 2800',
            '4532 1234 **** 2800',
            '4532 1234 5*** 2800',
            '4532 1234 56** 2800',
            '4532 1234 567* 2800',
            '4532 1234 5678 2800'
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                setAnimatedNumber(steps[currentStep]);
                currentStep++;
            } else {
                clearInterval(interval);
            }
        }, 80);
    };

    return (
        <div>
            <div className="dashboard-container">
                <aside className="sidebar">
                    <div className="logo">
                        <h2><i className="fas fa-university"></i> MangoBank</h2>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <h3 className="user-name" id="sidebar-user-name">Admin</h3>
                        <p className="user-email" id="sidebar-user-email">admin@MangoBank.me</p>
                    </div>
                    <nav className="sidebar-nav">
                        <ul>
                            <ol>
                                <Link className='link' href="/dashboard"><i className="fas fa-home"></i> Dashboard</Link>
                            </ol>
                            <ol>
                                <Link className='link' href="/transaction"><i className="fas fa-exchange-alt"></i> Transactions</Link>
                            </ol>
                            <ol className="active">
                                <Link className='link' href="#"><i className="fas fa-credit-card"></i> Cards</Link>
                            </ol>
                            <ol>
                                <Link className='link' href="/profile"><i className="fas fa-user-cog"></i> Profile</Link>
                            </ol>
                            <ol>
                                <Link className='link' href="/settings"><i className="fas fa-cog"></i> Settings</Link>
                            </ol>
                            <ol className="logout">
                                <Link className='link' href="../home"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                            </ol>
                        </ul>
                    </nav>
                </aside>

                <main className="main-content">
                    <header className="dashboard-header">
                        <div className="header-left"/>
                        <div className="header-actions">
                            <button className="btn-icon"><i className="far fa-bell"></i></button>
                            <button className="btn-icon"><i className="far fa-envelope"></i></button>
                        </div>
                    </header>
                    <section className="cards-overview">
                        <div className="section-header">
                            <h2>Manage your credit and debit cards.</h2>
                            <button className="btn btn-primary add-new-card" onClick={openModal}>
                                Add New Card
                            </button>
                        </div>

                        <div className="card-container">
                            <div className="credit-card visa-card">
                                <div className="card-content">
                                    <div className="card-header">
                                        <div className="bank-name">MangoBank</div>
                                        <div className="visa-logo">VISA</div>
                                    </div>
                                    <div className="card-number number-reveal">
                                        {animatedNumber}
                                    </div>
                                    <div className="card-usage">Card Usage: Admin</div>
                                    <div className="card-details-row">
                                        <div className="card-expiry">Expired: 07/28</div>
                                        {showDetails && <div className="card-cvv">CVV: 584</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="card-actions">
                                <button 
                                    className={`btn-action view-details ${isAnimating ? 'disabled' : ''}`} 
                                    onClick={toggleDetails}
                                    disabled={isAnimating}
                                >
                                    {isAnimating ? 'Loading...' : (showDetails ? 'Hide Details' : 'View Details')}
                                </button>
                                <button 
                                    className={`btn-action request-card ${isRequestingCard ? 'disabled' : ''}`} 
                                    onClick={openRequestModal}
                                    disabled={isRequestingCard}
                                >
                                    Request New Card
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Card</h2>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Card Type</label>
                                <select className="form-select">
                                    <option>Select Card Type</option>
                                    <option>Debit Card</option>
                                    <option>Credit Card</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Card Number</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    onKeyPress={(e) => {
                                        // Prevent non-numeric characters
                                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="MM/YY"
                                        value={expiryDate}
                                        onChange={handleExpiryChange}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                                e.preventDefault();
                                            }
                                        }}
                                        maxLength="5"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="XXX"
                                        maxLength="3"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Name on Card</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className={`btn-add-card ${isAddingCard ? 'loading' : ''}`}
                                onClick={handleAddCard}
                                disabled={isAddingCard}
                            >
                                {isAddingCard ? 'Adding Card...' : 'Add Card'}
                            </button>
                            <button 
                                className="btn-cancel" 
                                onClick={closeModal}
                                disabled={isAddingCard}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showRequestModal && (
                <div className="modal-overlay" onClick={closeRequestModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Request Virtual Card</h2>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Reason for request</label>
                                <select 
                                    className="form-select" 
                                    value={requestReason}
                                    onChange={(e) => setRequestReason(e.target.value)}
                                >
                                    <option value="">Select Reason</option>
                                    <option value="lost">Lost Card</option>
                                    <option value="stolen">Stolen Card</option>
                                    <option value="damaged">Damaged Card</option>
                                    <option value="expired">Expired Card</option>
                                    <option value="additional">Additional Card</option>
                                </select>
                            </div>

                            <div className="info-box">
                                <div className="info-icon">
                                    <i className="fas fa-info-circle"></i>
                                </div>
                                <div className="info-text">
                                    Your virtual card will be instantly available in your account after approval. You can use it for online payments and mobile wallet services.
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className={`btn-add-card ${isRequestingCard ? 'loading' : ''}`}
                                onClick={handleRequestCard}
                                disabled={isRequestingCard}
                            >
                                {isRequestingCard ? 'Requesting...' : 'Request Virtual Card'}
                            </button>
                            <button 
                                className="btn-cancel" 
                                onClick={closeRequestModal}
                                disabled={isRequestingCard}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}