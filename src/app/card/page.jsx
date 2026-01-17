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
    const [animatedNumber, setAnimatedNumber] = React.useState('**** **** **** ****');
    const [animatingCardId, setAnimatingCardId] = React.useState(null);
    const [revealedCardId, setRevealedCardId] = React.useState(null);
    const [isAddingCard, setIsAddingCard] = React.useState(false);
    const [isRequestingCard, setIsRequestingCard] = React.useState(false);
    const [cards, setCards] = useState([]);
    const [loadingCards, setLoadingCards] = useState(true);
    const [user, setUser] = useState({ fullName: '', email: '' });

    useEffect(() => {
        function decodeUserFromToken() {
            try {
                const t = localStorage.getItem('token');
                if (!t) return null;
                const payload = JSON.parse(atob(t.split('.')[1]));
                return { fullName: payload.fullName ?? '', email: payload.email ?? '' };
            } catch (e) {
                return null;
            }
        }

        async function fetchUser() {
            try {
                const response = await fetch('http://localhost:3001/Auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    const fallback = decodeUserFromToken();
                    if (fallback) setUser(fallback);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                const fallback = decodeUserFromToken();
                if (fallback) setUser(fallback);
            }
        }
        fetchUser();

        const onProfileUpdated = () => {
            try {
                const s = localStorage.getItem('user');
                if (s) {
                    const u = JSON.parse(s);
                    setUser({ fullName: u.fullName ?? '', email: u.email ?? '' });
                    return;
                }
            } catch (e) {}
            fetchUser();
        };
        window.addEventListener('profileUpdated', onProfileUpdated);
        return () => window.removeEventListener('profileUpdated', onProfileUpdated);
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

    const toggleDetails = (card) => {
        // If already animating this card, ignore
        if (animatingCardId === card.id) return;

        if (revealedCardId === card.id) {
            // hide
            setRevealedCardId(null);
  
            return;
        }

        // start animate reveal for this card
        setAnimatingCardId(card.id);
        animateNumberReveal(card.card_number, (step) => setAnimatedNumber(step), () => {
            setAnimatingCardId(null);
            setRevealedCardId(card.id);
        });
    };

    const openModal = () => {
        if (isAddingCard) return;
        setFormErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        if (isAddingCard) return;
        setShowModal(false);
        // reset form when modal is closed
        setCardNumber('');
        setExpiryDate('');
        setCardType('');
        setCvv('');
        setNameOnCard('');
        setFormErrors({});
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
        // sequential validation: show only the first missing/invalid field message
        const digits = cardNumber.replace(/\s/g, '');
        const checks = [
            ['cardType', () => !!cardType, 'Please select the card type first'],
            ['cardNumber', () => !!digits && digits.length === 16, 'Card number must be 16 digits'],
            ['expiryDate', () => !!expiryDate && /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate), 'Expiry must be in MM/YY format'],
            ['cvv', () => !!cvv && cvv.length === 3, 'CVV must be 3 digits'],
            ['nameOnCard', () => !!nameOnCard && nameOnCard.trim().length > 0, 'Name on card is required'],
        ];

        for (const [field, predicate, message] of checks) {
            if (!predicate()) {
                setFormErrors({ [field]: message });
                return;
            }
        }

        setFormErrors({});
        setIsAddingCard(true);
        try {
            const payload = {
                card_number: cardNumber.replace(/\s/g, ''),
                expiry_date: expiryDate,
                status: 'active',
                name_on_card: nameOnCard,
                card_type: cardType,
                    cvv: cvv,
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
                // reset all form fields after successful add
                setCardNumber('');
                setExpiryDate('');
                setCardType('');
                setCvv('');
                setNameOnCard('');
                setFormErrors({});
                // reset animated placeholder
                setAnimatedNumber('**** **** **** ****');
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

    const formatCardNumber = (num) => {
        if (!num) return '**** **** **** ****';
        const s = String(num).replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
        return s;
    };

    const animateNumberReveal = (fullNumber, onStep, onComplete) => {
        const clean = String(fullNumber).replace(/\s/g, '');
        const groups = [];
        for (let i = 0; i < clean.length; i += 4) groups.push(clean.substring(i, i + 4));

        const steps = [];
        for (let reveal = 0; reveal <= groups.length; reveal++) {
            const parts = groups.map((g, idx) => (idx < reveal ? g : '****'));
            steps.push(parts.join(' '));
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                onStep(steps[i]);
                i++;
            } else {
                clearInterval(interval);
                // final ensure full number
                onStep(formatCardNumber(fullNumber));
                if (onComplete) onComplete();
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
                                        const isAnimatingThis = animatingCardId === card.id;
                                        const isRevealed = revealedCardId === card.id;
                                        const displayedNumber = isAnimatingThis ? animatedNumber : (isRevealed ? formatCardNumber(num) : masked);
                                        return (
                                            <div className="card-container" key={card.id}>
                                                <div className="credit-card visa-card">
                                                    <div className="card-content">
                                                        <div className="card-header">
                                                            <div className="bank-name">MangoBank</div>
                                                            <div className="visa-logo">VISA</div>
                                                        </div>
                                                        <div className="card-number number-reveal">
                                                            {displayedNumber}
                                                        </div>
                                                        <div className="card-usage">Holder: {card.name_on_card ?? card.user?.fullName ?? 'User'}</div>
                                                        <div className="card-details-row">
                                                            <div className="card-expiry">Expiry: {card.expiry_date ?? '--/--'}</div>
                                                            {isRevealed ? <div className="card-cvv">CVV: {card.cvv_hash ?? card.cvv ?? '•••'}</div> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-actions">
                                                    <button className={`btn-action view-details ${isAnimatingThis ? 'disabled' : ''}`} onClick={() => toggleDetails(card)} disabled={isAnimatingThis}>
                                                        {isAnimatingThis ? 'Loading...' : (isRevealed ? 'Hide Details' : 'View Details')}
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
                                <select className="form-select" value={cardType} onChange={(e) => { setCardType(e.target.value); setFormErrors(prev => ({ ...prev, cardType: undefined })); }} required>
                                    <option value="" disabled>Select Card Type</option>
                                    <option value="debit">Debit Card</option>
                                    <option value="credit">Credit Card</option>
                                </select>
                                {formErrors.cardType && <div className="field-error" style={{ color: 'red' }}>{formErrors.cardType}</div>}
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
                                        readOnly={!cardType || isAddingCard}
                                        onFocus={() => {
                                            if (!cardType) {
                                                setFormErrors(prev => ({ ...prev, cardType: 'Please select card type first' }));
                                                const el = document.querySelector('.form-select');
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }}
                                />
                                {formErrors.cardNumber && <div className="field-error" style={{ color: 'red' }}>{formErrors.cardNumber}</div>}
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
                                        readOnly={!cardType || isAddingCard}
                                        onFocus={() => {
                                            if (!cardType) {
                                                setFormErrors(prev => ({ ...prev, cardType: 'Please select card type first' }));
                                                const el = document.querySelector('.form-select');
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }}
                                    />
                                {formErrors.expiryDate && <div className="field-error" style={{ color: 'red' }}>{formErrors.expiryDate}</div>}
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
                                        readOnly={!cardType || isAddingCard}
                                        onFocus={() => {
                                            if (!cardType) {
                                                setFormErrors(prev => ({ ...prev, cardType: 'Please select card type first' }));
                                                const el = document.querySelector('.form-select');
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                        }}
                                    />
                                {formErrors.cvv && <div className="field-error" style={{ color: 'red' }}>{formErrors.cvv}</div>}
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
                                    readOnly={!cardType || isAddingCard}
                                    onFocus={() => {
                                        if (!cardType) {
                                            setFormErrors(prev => ({ ...prev, cardType: 'Please select card type first' }));
                                            const el = document.querySelector('.form-select');
                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    }}
                                />
                                {formErrors.nameOnCard && <div className="field-error" style={{ color: 'red' }}>{formErrors.nameOnCard}</div>}
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