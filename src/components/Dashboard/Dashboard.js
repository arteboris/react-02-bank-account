import React, { Component } from 'react';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

toast.configure({
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export default class Dashboard extends Component {
  state = {
    transactions: [],
    amount: '',
    balance: 0,
    income: 0,
    expenses: 0,
  };

  resetAmount = () => {
    this.setState({ amount: '' });
  };

  handleChange = e => {
    const amount = Number(e.target.value);
    this.setState({ amount });
  };

  onDeposit = () => {
    const { amount, balance, transactions } = this.state;
    const transaction = {
      id: shortid.generate(),
      type: 'deposit',
      amount,
      date: new Date().toLocaleString(),
    };
    if (amount > 0) {
      toast.success('Операция успешна');
      this.setState({
        balance: balance + transaction.amount,
        transactions: [...transactions, transaction],
      });
      this.income();
      this.resetAmount();
    } else {
      toast.warning('Введите сумму больше нуля для проведения операции!');
      this.resetAmount();
    }
  };

  onWithdraw = () => {
    const { amount, balance, transactions } = this.state;
    const transaction = {
      id: shortid.generate(),
      type: 'withdraw',
      amount,
      date: new Date().toLocaleString(),
    };
    if (amount <= 0) {
      toast.warning('Введите сумму больше нуля для проведения операции!');
      this.resetAmount();
    } else if (balance < amount) {
      toast.error('На счету недостаточно средств для проведения операции!');
      this.resetAmount();
    } else {
      this.setState({
        balance: balance - transaction.amount,
        transactions: [...transactions, transaction],
      });
      toast.success('Операция успешна');
      this.expenses();
      this.resetAmount();
    }
  };

  income = () => {
    const { amount } = this.state;
    this.setState(prevState => ({ income: prevState.income + amount }));
  };

  expenses = () => {
    const { amount } = this.state;
    this.setState(prevState => ({ expenses: prevState.expenses + amount }));
  };

  render() {
    const { transactions, amount, balance, income, expenses } = this.state;
    return (
      <div className="dashboard">
        <Controls
          amount={amount}
          handleChange={this.handleChange}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
