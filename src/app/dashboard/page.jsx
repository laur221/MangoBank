'use client';
import Link from 'next/link';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Dashboard() {
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
                            <li className="active">
                                <Link className='link' href="/dashboard"><i className="fas fa-home"></i> Dashboard</Link>
                            </li>
                            <li>
                                <Link className='link' href="#"><i className="fas fa-exchange-alt"></i> Transactions</Link>
                            </li>
                            <li>
                                <Link className='link' href="#"><i className="fas fa-credit-card"></i> Cards</Link>
                            </li>
                            <li>
                                <Link className='link' href="#"><i className="fas fa-user-cog"></i> Profile</Link>
                            </li>
                            <li>
                                <Link className='link' href="#"><i className="fas fa-cog"></i> Settings</Link>
                            </li>
                            <li className="logout">
                                <Link className='link' href="../home"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                            </li>
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

                    <div className="dashboard-content">
                        <h1 className="page-title">Dashboard</h1>
                        <p className="welcome-message" id="welcome-message">Welcome back! Here's your financial summary.</p>
                        <section className="account-overview">
                            <div className="card balance-card">
                                <div className="card-icon">
                                    <i className="fas fa-wallet"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Current Balance</h3>
                                    <p className="balance" id="current-balance">$0.00</p>
                                    <span className="card-subtitle">Available</span>
                                </div>
                            </div>
                            <div className="card income-card">
                                <div className="card-icon">
                                    <i className="fas fa-arrow-down"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Income</h3>
                                    <p className="amount" id="income-amount">$0.00</p>
                                    <span className="card-subtitle">This Month</span>
                                </div>
                            </div>
                            <div className="card expense-card">
                                <div className="card-icon">
                                    <i className="fas fa-arrow-up"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Expenses</h3>
                                    <p className="amount" id="expense-amount">$0.00</p>
                                    <span className="card-subtitle">This Month</span>
                                </div>
                            </div>
                        </section>
                        <section className="money-transfer">
                            <div className="section-header">
                                <h2><i className="fas fa-exchange-alt"></i> Transfer Money</h2>
                            </div>
                            <div className="transfer-container">
                                <form id="transferForm" className="transfer-form">
                                    <TextField id="recipient" label="Recipient Account" variant="standard" color="warning" type='text' placeholder='Enter account number or email' required />
                                    <TextField id="amount" label="Amount" variant="standard" color="warning" type='number' placeholder='$ 0.00' min="1" step="0.01" />
                                    <TextField id="transferNote" label="Note (Optional)" variant="standard" color="warning" type='text' />
                                    <button type="submit" className="btn btn-primary">Send Money</button>
                                </form>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}