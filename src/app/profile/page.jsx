'use client';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function Profile() {
    const [user, setUser] = useState({ fullName: '', email: '' });
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Verification states
    const [verification, setVerification] = useState({
        email: {
            isVerifying: false,
            code: '',
            codeSent: false,
            sending: false,
            sentCode: '', // Store the sent code
            isVerified: false
        },
        phone: {
            isVerifying: false,
            code: '',
            codeSent: false,
            sending: false,
            sentCode: '', // Store the sent code
            isVerified: false
        }
    });
    const [originalData, setOriginalData] = useState({});

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

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('/api/user/profile');
            if (response.ok) {
                const data = await response.json();
                const profileData = {
                    fullName: data.user.fullName || '',
                    email: data.user.email || '',
                    phoneNumber: data.user.phoneNumber || '',
                    address: data.user.address || ''
                };
                setUserData(profileData);
                setOriginalData(profileData);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        // For phone number, only allow digits
        if (field === 'phoneNumber') {
            value = value.replace(/\D/g, '');
        }
        
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));

        // Check if email or phone changed to trigger verification
        if ((field === 'email' || field === 'phoneNumber') && value !== originalData[field]) {
            // For email, validate format before allowing verification
            if (field === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    // Reset verification state if email is invalid
                    setVerification(prev => ({
                        ...prev,
                        email: {
                            ...prev.email,
                            isVerifying: false,
                            codeSent: false,
                            code: '',
                            isVerified: false
                        }
                    }));
                    return;
                }
            }
            
            setVerification(prev => ({
                ...prev,
                [field === 'phoneNumber' ? 'phone' : field]: {
                    ...prev[field === 'phoneNumber' ? 'phone' : field],
                    isVerifying: true,
                    codeSent: false,
                    code: '',
                    isVerified: false
                }
            }));
        } else if ((field === 'email' || field === 'phoneNumber') && value === originalData[field]) {
            setVerification(prev => ({
                ...prev,
                [field === 'phoneNumber' ? 'phone' : field]: {
                    ...prev[field === 'phoneNumber' ? 'phone' : field],
                    isVerifying: false,
                    codeSent: false,
                    code: '',
                    isVerified: false
                }
            }));
        }
    };

    const handleSendCode = async (type) => {
        // Additional validation before sending code
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
        }

        setVerification(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                sending: true
            }
        }));

        // Generate a random 6-digit code
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Simulate API call
        setTimeout(() => {
            setVerification(prev => ({
                ...prev,
                [type]: {
                    ...prev[type],
                    sending: false,
                    codeSent: true,
                    sentCode: generatedCode,
                    isVerified: false
                }
            }));
            alert(`Verification code sent to your ${type === 'email' ? 'email' : 'phone number'}! Code: ${generatedCode}`);
        }, 2000);
    };

    const handleVerificationCodeChange = (type, code) => {
        // Only allow numbers and limit to 6 digits
        const numericCode = code.replace(/\D/g, '').substring(0, 6);
        
        setVerification(prev => {
            const newState = {
                ...prev,
                [type]: {
                    ...prev[type],
                    code: numericCode
                }
            };

            // Check if code is correct when 6 digits are entered
            if (numericCode.length === 6) {
                if (numericCode === prev[type].sentCode) {
                    newState[type].isVerified = true;
                    setTimeout(() => {
                        // Hide verification UI after successful verification
                        setVerification(prevState => ({
                            ...prevState,
                            [type]: {
                                ...prevState[type],
                                isVerifying: false,
                                codeSent: false,
                                code: '',
                                sending: false
                            }
                        }));
                    }, 100);
                } else {
                    newState[type].isVerified = false;
                    setTimeout(() => {
                        alert('Invalid verification code. Please try again.');
                    }, 100);
                }
            } else {
                newState[type].isVerified = false;
            }

            return newState;
        });
    };

    const handleSave = async () => {
        // Check if verification is required and completed
        const emailChanged = userData.email !== originalData.email;
        const phoneChanged = userData.phoneNumber !== originalData.phoneNumber;

        if (emailChanged && !verification.email.isVerified) {
            alert('Please verify your email address before saving.');
            return;
        }

        if (phoneChanged && !verification.phone.isVerified) {
            alert('Please verify your phone number before saving.');
            return;
        }

        setSaving(true);
        try {
            // Simulate API call - always succeed
            setTimeout(() => {
                setIsEditing(false);
                setOriginalData(userData);
                setVerification({
                    email: { isVerifying: false, code: '', codeSent: false, sending: false, sentCode: '', isVerified: false },
                    phone: { isVerifying: false, code: '', codeSent: false, sending: false, sentCode: '', isVerified: false }
                });
                alert('Profile updated successfully!');
                setSaving(false);
            }, 1500);
        } catch (error) {
            // Remove error handling - always show success
            setIsEditing(false);
            setOriginalData(userData);
            setVerification({
                email: { isVerifying: false, code: '', codeSent: false, sending: false, sentCode: '', isVerified: false },
                phone: { isVerifying: false, code: '', codeSent: false, sending: false, sentCode: '', isVerified: false }
            });
            alert('Profile updated successfully!');
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUserData(originalData);
        setVerification({
            email: { isVerifying: false, code: '', codeSent: false, sending: false, sentCode: '', isVerified: false },
            phone: { isVerifying: false, code: '', codeSent: false, sending: false, sentCode: '', isVerified: false }
        });
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.fullName}</p>
            <p>Email: {user.email}</p>
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
                            <ol>
                                <Link className='link' href="/card"><i className="fas fa-credit-card"></i> Cards</Link>
                            </ol>
                            <ol className="active">
                                <Link className='link' href="#"><i className="fas fa-user-cog"></i> Profile</Link>
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
                        <div className="header-left" />
                        <div className="header-actions">
                            <button className="btn-icon"><i className="far fa-bell"></i></button>
                            <button className="btn-icon"><i className="far fa-envelope"></i></button>
                        </div>
                    </header>

                    <div className="profile-content">
                        <div className="profile-header">
                            <h1>Profile Settings</h1>
                            <p>Manage your personal information and account settings.</p>
                        </div>

                        <div className="profile-card">
                            <div className="profile-avatar-section">
                                <div className="profile-avatar">
                                    <i className="fas fa-user-circle"></i>
                                </div>
                                <button className="change-photo-btn">
                                    <i className="fas fa-camera"></i> Change Photo
                                </button>
                            </div>

                            <div className="profile-form">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Username"
                                        value={userData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className={`form-group ${verification.email.isVerifying ? 'verification-active' : ''}`}>
                                    <label>Email Address</label>
                                    <div className="input-with-button">
                                        <input
                                            type="email"
                                            className="form-input"
                                            placeholder="Username@gmail.com"
                                            value={userData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            disabled={!isEditing || verification.email.isVerified}
                                        />
                                        {verification.email.isVerifying && isEditing && (
                                            <button
                                                type="button"
                                                className="send-code-btn"
                                                onClick={() => handleSendCode('email')}
                                                disabled={verification.email.sending || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)}
                                            >
                                                {verification.email.sending ? 'Sending...' : 'Send Code'}
                                            </button>
                                        )}
                                    </div>
                                    {verification.email.isVerifying && isEditing && (
                                        <div className="verification-section">
                                            <label>Code</label>
                                            <div className="verification-input-container">
                                                <input
                                                    type="text"
                                                    className={`form-input verification-input ${verification.email.isVerified ? 'verified' : verification.email.code.length === 6 && !verification.email.isVerified ? 'invalid' : ''}`}
                                                    placeholder="Enter code"
                                                    value={verification.email.code}
                                                    onChange={(e) => handleVerificationCodeChange('email', e.target.value)}
                                                    maxLength="6"
                                                />
                                                {verification.email.isVerified && (
                                                    <i className="fas fa-check-circle verification-success"></i>
                                                )}
                                                {verification.email.code.length === 6 && !verification.email.isVerified && (
                                                    <i className="fas fa-times-circle verification-error"></i>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={`form-group ${verification.phone.isVerifying ? 'verification-active' : ''}`}>
                                    <label>Phone Number</label>
                                    <div className="input-with-button">
                                        <input
                                            type="tel"
                                            className="form-input"
                                            placeholder="Phone Number"
                                            value={userData.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            onKeyPress={(e) => {
                                                // Only allow digits
                                                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            disabled={!isEditing || verification.phone.isVerified}
                                        />
                                        {verification.phone.isVerifying && isEditing && (
                                            <button
                                                type="button"
                                                className="send-code-btn"
                                                onClick={() => handleSendCode('phone')}
                                                disabled={verification.phone.sending}
                                            >
                                                {verification.phone.sending ? 'Sending...' : 'Send Code'}
                                            </button>
                                        )}
                                    </div>
                                    {verification.phone.isVerifying && isEditing && (
                                        <div className="verification-section">
                                            <label>Code</label>
                                            <div className="verification-input-container">
                                                <input
                                                    type="text"
                                                    className={`form-input verification-input ${verification.phone.isVerified ? 'verified' : verification.phone.code.length === 6 && !verification.phone.isVerified ? 'invalid' : ''}`}
                                                    placeholder="Enter code"
                                                    value={verification.phone.code}
                                                    onChange={(e) => handleVerificationCodeChange('phone', e.target.value)}
                                                    maxLength="6"
                                                />
                                                {verification.phone.isVerified && (
                                                    <i className="fas fa-check-circle verification-success"></i>
                                                )}
                                                {verification.phone.code.length === 6 && !verification.phone.isVerified && (
                                                    <i className="fas fa-times-circle verification-error"></i>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea
                                        className="form-input form-textarea"
                                        placeholder="Address"
                                        value={userData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        disabled={!isEditing}
                                        rows="3"
                                    />
                                </div>

                                <div className="form-actions">
                                    {!isEditing ? (
                                        <button
                                            className="btn-edit"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="edit-actions">
                                            <button
                                                className="btn-save"
                                                onClick={handleSave}
                                                disabled={saving}
                                            >
                                                {saving ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button
                                                className="btn-cancel"
                                                onClick={handleCancel}
                                                disabled={saving}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}