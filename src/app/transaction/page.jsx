'use client';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
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
        async function loadTransactions() {
            try {
                const res = await fetch('http://localhost:3001/transactions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    // Expect data to be array of transactions with amount/date/etc.
                    setTransactions(Array.isArray(data) ? data : []);
                } else {
                    console.warn('Transactions endpoint returned non-OK status', res.status);
                }
            } catch (err) {
                console.warn('Failed to fetch transactions, using fallback', err);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        }
        loadTransactions();
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
                            <ol>
                                <Link className='link' href="/dashboard"><i className="fas fa-home"></i> Dashboard</Link>
                            </ol>
                            <ol className="active">
                                <Link className='link' href="#"><i className="fas fa-exchange-alt"></i> Transactions</Link>
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

                    <section className="transaction-history">
                            <div className="section-header">
                                <h2><i className="fas fa-history"></i> Transaction History</h2>
                                <div className="filter-options">
                                    <select id="transactionFilter" className="filter-select">
                                        <option value="all">All Transactions</option>
                                        <option value="sent">Sent</option>
                                        <option value="received">Received</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="transactions-table-container">
                                <table className="transactions-table">
                                    <thead>
                                        <tr>
                                            <th>Transaction</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="transactions-table-body">{loading ? (
                                            <tr className="loading-row">
                                                <td colSpan="4" className="text-center">
                                                    <div className="loading-spinner">
                                                        <i className="fas fa-spinner fa-spin"></i> Loading transactions...
                                                    </div>
                                                </td>
                                            </tr>): 
                                            (transactions.map((transaction) => (
                                                <tr key={transaction.id} className="transaction-row">
                                                    <td>
                                                        <div className="transaction-info">
                                                            <div className={`transaction-icon ${transaction.color}`}>
                                                                <i className={transaction.icon}></i>
                                                            </div>
                                                            <div>
                                                                <span className="transaction-type">{transaction.type}</span>
                                                                <span className="transaction-recipient">{transaction.recipient}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                                    <td className={transaction.amount > 0 ? 'amount-positive' : 'amount-negative'}>
                                                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge status-${transaction.status.toLowerCase()}`}>
                                                            {transaction.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                </main>
            </div>
        </div>
    );
}