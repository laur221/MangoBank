'use client';
import Link from 'next/link';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export default function Card() {
    const [showDetails, setShowDetails] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showRequestModal, setShowRequestModal] = React.useState(false);
    const [cardNumber, setCardNumber] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState('');
    const [cardType, setCardType] = React.useState('');
    const [cvv, setCvv] = React.useState('');
    const [nameOnCard, setNameOnCard] = React.useState('');
    const [formErrors, setFormErrors] = React.useState({});
    const [requestReason, setRequestReason] = React.useState('');
    const [animatedNumber, setAnimatedNumber] = React.useState('**** **** **** 2800');
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [isAddingCard, setIsAddingCard] = React.useState(false);
    const [isRequestingCard, setIsRequestingCard] = React.useState(false);
    const [cards, setCards] = useState([]);
    const [loadingCards, setLoadingCards] = useState(true);
    const [user, setUser] = useState({ fullName: '', email: '' });

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('http://localhost:3001/Auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchCards() {
            setLoadingCards(true);
            try {
                const res = await fetch('http://localhost:3001/cards', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setCards(Array.isArray(data) ? data : []);
                } else {
                    console.warn('Failed to fetch cards', res.status);
                    setCards([]);
                }
            } catch (err) {
                console.warn('Error fetching cards', err);
                setCards([]);
            } finally {
                setLoadingCards(false);
            }
        }
        fetchCards();
    }, []);

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
        // validate before sending
        const errors = {};
        if (!cardType) errors.cardType = 'Card type is required';
        const digits = cardNumber.replace(/\s/g, '');
        if (!digits || digits.length !== 16) errors.cardNumber = 'Card number must be 16 digits';
        if (!expiryDate || !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate)) errors.expiryDate = 'Expiry must be in MM/YY format';
        if (!cvv || cvv.length !== 3) errors.cvv = 'CVV must be 3 digits';
        if (!nameOnCard || nameOnCard.trim().length === 0) errors.nameOnCard = 'Username is required';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setIsAddingCard(true);
        try {
            const payload = {
                card_number: cardNumber.replace(/\s/g, ''),
                expiry_date: expiryDate,
                status: 'active',
            };
            const res = await fetch('http://localhost:3001/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                const created = await res.json();
                setCards((c) => [created, ...c]);
                setShowModal(false);
                setCardNumber('');
                setExpiryDate('');
            } else {
                console.warn('Failed to add card', res.status);
            }
        } catch (err) {
            console.error('Error adding card', err);
        } finally {
            setIsAddingCard(false);
        }
    };

    const isFormValid = () => {
        const digits = cardNumber.replace(/\s/g, '');
        return (
            cardType &&
            digits && digits.length === 16 &&
            expiryDate && /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate) &&
            cvv && cvv.length === 3 &&
            nameOnCard && nameOnCard.trim().length > 0
        );
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
                        <h3 className="user-name" id="sidebar-user-name">{user.fullName}</h3>
                        <p className="user-email" id="sidebar-user-email">{user.email}</p>
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

                        <div className="card-list">
                            {loadingCards ? (
                                <div className="loading">Loading cards...</div>
                            ) : cards.length === 0 ? (
                                <div className="empty-cards">You have no cards. Add one to get started.</div>
                            ) : (
                                cards.map((card) => {
                                    const num = card.card_number || '';
                                    const last4 = num.slice(-4) || '0000';
                                    const masked = `**** **** **** ${last4}`;
                                    return (
                                        <div className="card-container" key={card.id}>
                                            <div className="credit-card visa-card">
                                                <div className="card-content">
                                                    <div className="card-header">
                                                        <div className="bank-name">MangoBank</div>
                                                        <div className="visa-logo">VISA</div>
                                                    </div>
                                                    <div className="card-number number-reveal">
                                                        {masked}
                                                    </div>
                                                    <div className="card-usage">Card Usage: {card.status ?? 'User'}</div>
                                                    <div className="card-details-row">
                                                        <div className="card-expiry">Expiry: {card.expiry_date ?? '--/--'}</div>
                                                        {showDetails && <div className="card-cvv">CVV: •••</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-actions">
                                                <button className={`btn-action view-details ${isAnimating ? 'disabled' : ''}`} onClick={toggleDetails} disabled={isAnimating}>
                                                    {isAnimating ? 'Loading...' : (showDetails ? 'Hide Details' : 'View Details')}
                                                </button>
                                                <button className={`btn-action request-card ${isRequestingCard ? 'disabled' : ''}`} onClick={openRequestModal} disabled={isRequestingCard}>
                                                    Request New Card
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
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
                                <select className="form-select" value={cardType} onChange={(e) => setCardType(e.target.value)} required>
                                    <option value="" disabled>Select Card Type</option>
                                    <option value="debit">Debit Card</option>
                                    <option value="credit">Credit Card</option>
                                </select>
                                {formErrors.cardType && <div className="field-error">{formErrors.cardType}</div>}
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
                                        required
                                        disabled={!cardType || isAddingCard}
                                />
                                {formErrors.cardNumber && <div className="field-error">{formErrors.cardNumber}</div>}
                                {!cardType && !formErrors.cardNumber && <div className="field-note">Select card type to enable this field</div>}
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
                                        required
                                        disabled={!cardType || isAddingCard}
                                    />
                                {formErrors.expiryDate && <div className="field-error">{formErrors.expiryDate}</div>}
                                {!cardType && !formErrors.expiryDate && <div className="field-note">Select card type to enable this field</div>}
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        placeholder="XXX"
                                        maxLength="3"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0,3))}
                                        required
                                        disabled={!cardType || isAddingCard}
                                    />
                                {formErrors.cvv && <div className="field-error">{formErrors.cvv}</div>}
                                {!cardType && !formErrors.cvv && <div className="field-note">Select card type to enable this field</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Name on Card</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="Username"
                                    value={nameOnCard}
                                    onChange={(e) => setNameOnCard(e.target.value)}
                                    required
                                    disabled={!cardType || isAddingCard}
                                />
                                {formErrors.nameOnCard && <div className="field-error">{formErrors.nameOnCard}</div>}
                                {!cardType && !formErrors.nameOnCard && <div className="field-note">Select card type to enable this field</div>}
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
                                disabled={isRequestingCard || !requestReason}
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