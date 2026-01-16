'use client';
import Link from 'next/link';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [user, setUser] = useState({ fullName: '', email: '' });
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [transactions, setTransactions] = useState([]);

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
        async function fetchFinancials() {
            try {
                // Fetch accounts and compute balance
                const accountsRes = await fetch('http://localhost:3001/accounts', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                if (accountsRes.ok) {
                    const accountsData = await accountsRes.json();
                    // assume accountsData is an array of accounts with `balance`
                    const total = Array.isArray(accountsData)
                        ? accountsData.reduce((s, a) => s + (Number(a.balance) || 0), 0)
                        : 0;
                    setBalance(total);
                }

                // Fetch transactions to compute income/expenses
                const txRes = await fetch('http://localhost:3001/transactions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                if (txRes.ok) {
                    const txData = await txRes.json();
                    const now = new Date();
                    const thisMonth = txData.filter((t) => {
                        const d = new Date(t.date);
                        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
                    });
                    const inc = thisMonth.reduce((s, t) => s + (t.amount > 0 ? Number(t.amount) : 0), 0);
                    const exp = thisMonth.reduce((s, t) => s + (t.amount < 0 ? Math.abs(Number(t.amount)) : 0), 0);
                    setIncome(inc);
                    setExpenses(exp);
                    setTransactions(txData);
                }
            } catch (error) {
                console.warn('Could not fetch financials, using defaults', error);
            }
        }
        fetchFinancials();
    }, []);

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
                            <ol className="active">
                                <Link className='link' href="#"><i className="fas fa-home"></i> Dashboard</Link>
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
                                    <p className="amount" id="current-balance">${balance.toFixed(2)}</p>
                                    <span className="card-subtitle">Available</span>
                                </div>
                            </div>
                            <div className="card income-card">
                                <div className="card-icon">
                                    <i className="fas fa-arrow-down"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Income</h3>
                                    <p className="amount" id="income-amount">${income.toFixed(2)}</p>
                                    <span className="card-subtitle">This Month</span>
                                </div>
                            </div>
                            <div className="card expense-card">
                                <div className="card-icon">
                                    <i className="fas fa-arrow-up"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Expenses</h3>
                                    <p className="amount" id="expense-amount">${expenses.toFixed(2)}</p>
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
                                    <button type="submit" className="btn-primary">Send Money</button>
                                </form>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}