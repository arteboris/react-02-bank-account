import React from 'react';
import PropTypes from 'prop-types';
import css from './TransactionHistory.module.css';
import Transaction from '../Transaction/Transaction';

const TransactionHistory = ({ transactions }) => {
  return (
    <table className={css.history}>
      <thead>
        <tr className={css.theadTitle}>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(elem => (
          <Transaction transactions={elem} key={elem.id} />
        ))}
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};

export default TransactionHistory;
