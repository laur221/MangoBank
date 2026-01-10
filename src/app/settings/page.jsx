'use client';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function Settings() {
    const [user, setUser] = useState({ fullName: '', email: '' });
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [selectedAuthMethod, setSelectedAuthMethod] = useState('authenticator');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

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

    const handlePasswordChange = () => {
        setShowPasswordModal(true);
    };

    const handleAdd2FA = () => {
        setShow2FAModal(true);
    };

    const handleChangeNotification = () => {
        setShowNotificationModal(true);
    };

    const closeModals = () => {
        setShowPasswordModal(false);
        setShow2FAModal(false);
        setShowNotificationModal(false);
        setSelectedAuthMethod('authenticator');
        setPhoneNumber('');
        setEmailAddress('');
        setVerificationCode('');
    };

    const handleAuthMethodChange = (method) => {
        setSelectedAuthMethod(method);
        setVerificationCode('');
    };

    const handleSendCode = () => {
        // Simulate sending code
        alert(`Verification code sent to your ${selectedAuthMethod === 'phone' ? 'phone number' : 'email'}!`);
    };

    const handleSubmit2FA = () => {
        // Handle 2FA setup
        alert('Two-Factor Authentication has been enabled successfully!');
        closeModals();

    const handleNotificationChange = (e) => {
        // Handle notification preferences
        console.log('Notification changed:', e.target.value);
    };

    return (
        <div>
            <h1>Settings</h1>
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
                            <ol>
                                <Link className='link' href="/card"><i className="fas fa-credit-card"></i> Cards</Link>
                            </ol>
                            <ol>
                                <Link className='link' href="/profile"><i className="fas fa-user-cog"></i> Profile</Link>
                            </ol>
                            <ol className="active">
                                <Link className='link' href="#"><i className="fas fa-cog"></i> Settings</Link>
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

                    <div className="settings-content">
                        <div className="settings-header">
                            <h1>Account Settings</h1>
                            <p>Customize your account preferences and security settings.</p>
                        </div>
                    </div>

                        <div className="settings-sections">
                            {/* Change Password Section */}
                            <div className="settings-section">
                                <div className="section-content">
                                    <h2>Change Password</h2>
                                    <p>Update your account password regularly to maintain security</p>
                                    <button className="btn-setting" onClick={handlePasswordChange}>
                                        Change Password
                                    </button>
                                </div>
                            </div>

                            {/* Two-Factor Authentication Section */}
                            <div className="settings-section">
                                <div className="section-content">
                                    <h2>Two-Factor Authentication</h2>
                                    <p>Add an extra layer of security to your account</p>
                                    <button className="btn-setting" onClick={() => setShow2FAModal(true)}>
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Notification Preferences Section */}
                            <div className="settings-section">
                                <div className="section-content">
                                    <h2>Notification Preferences</h2>
                                    <p>Change what notifications you want to receive</p>
                                    <button className="btn-setting" onClick={handleChangeNotification}>
                                        Change Notification
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Password Change Modal */}
                {showPasswordModal && (
                    <div className="modal-overlay" onClick={closeModals}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Change Password</h2>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" className="form-input" placeholder="Enter current password" />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" className="form-input" placeholder="Enter new password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" className="form-input" placeholder="Confirm new password" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-save">Update Password</button>
                                <button className="btn-cancel" onClick={closeModals}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Updated 2FA Modal */}
                {show2FAModal && (
                    <div className="modal-overlay" onClick={closeModals}>
                        <div className="modal-content twofa-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Two-Factor Authentication</h2>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Select Type Two-Factor Authentication</label>
                                    <select
                                        className="form-select"
                                        value={selectedAuthMethod}
                                        onChange={(e) => handleAuthMethodChange(e.target.value)}
                                    >
                                        <option value="authenticator">Google Authenticator</option>
                                        <option value="phone">Phone Number</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>

                                {selectedAuthMethod === 'authenticator' && (
                                    <div className="authenticator-section">
                                        <h3>Google Authenticator</h3>
                                        <div className="qr-code-container">
                                            <img src="/two.png" alt="QR Code" className="qr-code" />
                                        </div>
                                        <p className="qr-instruction">Scan Qr-Code in Google Authenticator</p>
                                        <div className="form-group">
                                            <label>Code of aplication</label>
                                            <input
                                                type="text"
                                                className="form-input code-input"
                                                placeholder="Code"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                maxLength="6"
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedAuthMethod === 'phone' && (
                                    <div className="phone-section">
                                        <h3>Phone Number</h3>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <div className="input-with-button">
                                                <input
                                                    type="tel"
                                                    className="form-input"
                                                    placeholder="+37548076488"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className="send-code-btn"
                                                    onClick={handleSendCode}
                                                >
                                                    Send Code
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Code</label>
                                            <input
                                                type="text"
                                                className="form-input code-input"
                                                placeholder="Code"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                maxLength="6"
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedAuthMethod === 'email' && (
                                    <div className="email-section">
                                        <h3>Email</h3>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <div className="input-with-button">
                                                <input
                                                    type="email"
                                                    className="form-input"
                                                    placeholder="Test@gmail.com"
                                                    value={emailAddress}
                                                    onChange={(e) => setEmailAddress(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className="send-code-btn"
                                                    onClick={handleSendCode}
                                                >
                                                    Send Code
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Code</label>
                                            <input
                                                type="text"
                                                className="form-input code-input"
                                                placeholder="Code"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                maxLength="6"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn-save" onClick={handleSubmit2FA}>Add</button>
                                <button className="btn-cancel" onClick={closeModals}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notification Preferences Modal */}
                {showNotificationModal && (
                    <div className="modal-overlay" onClick={closeModals}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Notification Preferences</h2>
                            </div>
                            <div className="modal-body">
                                <div className="notification-options">
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <h4>Transaction Alerts</h4>
                                            <p>Get notified when money is sent or received</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <h4>Security Alerts</h4>
                                            <p>Important security notifications about your account</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <h4>Marketing Emails</h4>
                                            <p>Promotional offers and product updates</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <h4>Monthly Statements</h4>
                                            <p>Receive monthly account statements via email</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-save">Save Preferences</button>
                                <button className="btn-cancel" onClick={closeModals}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}