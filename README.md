# 💳 Fintech Banking Application

A modern fintech banking simulation application built with Next.js, TypeScript, Tailwind CSS, and Appwrite. This project allows users to manage multiple bank accounts, track transactions, transfer funds between users, and generate downloadable transaction receipts in PDF format.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login
* User Logout
* Protected Routes

### 🏦 Bank Account Management

* Create Multiple Bank Accounts
* View Account Balances
* Copy Account Numbers
* Real-Time Balance Updates

### 💸 Transaction Management

* Add Income Transactions
* Add Expense Transactions
* Transaction Status Tracking

  * Success
  * Pending
  * Failed
* Search Transactions
* Transaction History

### 🔄 Fund Transfer

* Transfer Money Between Users
* Transfer Using Account Number
* Multi-Bank Support
* Insufficient Balance Validation

### 📄 Receipt & Reports

* Transaction Detail Page
* Download Transaction Receipt as PDF
* Export Full Transaction History as PDF

### 📱 Responsive Design

* Desktop Friendly
* Mobile Responsive Layout
* Mobile Transaction Cards

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS

### Backend & Database

* Appwrite

### Additional Libraries

* React Hook Form
* Zod
* Lucide React
* Sonner
* jsPDF

---

## 📂 Project Structure

```bash
app/
├── dashboard/
├── my-banks/
├── transactions/
├── transfer/
├── add-transaction/
├── add-bank/

components/
├── dashboard/
├── shared/

lib/
├── appwrite.ts

types/
├── index.ts
```

---

## 📸 Screenshots

### Dashboard

Add dashboard screenshot here.

### My Banks

Add bank account screenshot here.

### Transaction History

Add transaction history screenshot here.

### Transfer Funds

Add transfer screenshot here.

### Transaction Receipt

Add receipt screenshot here.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/maziyaqofi/BankingLite-Fintech
```

Navigate to project folder:

```bash
cd your-repository
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=

NEXT_PUBLIC_APPWRITE_DATABASE_ID=

NEXT_PUBLIC_APPWRITE_BANK_ACCOUNTS_TABLE_ID=
NEXT_PUBLIC_APPWRITE_TRANSACTIONS_TABLE_ID=
```

Run development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🎯 Learning Outcomes

This project was built to practice and demonstrate:

* Authentication & Authorization
* Database Design
* Multi-User Systems
* Financial Transaction Logic
* State Management
* PDF Generation
* Responsive Web Development
* Full-Stack Application Development

---

## 🔮 Future Improvements

* Transaction Notifications
* Dark Mode
* User Profile Management
* Monthly Financial Analytics
* Advanced Transaction Filters
* Download Bank Statements
* Email Verification

---

## 👨‍💻 Author

**Maziya Ats Tsaqofi**
Computer Science Student | Software Developer | AI Tech Enthusiasts
Date: 29 May 2026
