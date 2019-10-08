import React from 'react';
import PropTypes from 'prop-types';
import css from './Transaction.module.css';

const Transaction = ({ transactions: { type, amount, date } }) => {
  return (
    <>
      <tr className={css.trText}>
        <td>{type}</td>
        <td>{amount}</td>
        <td>{date}</td>
      </tr>
    </>
  );
};

Transaction.propTypes = {
  transactions: PropTypes.shape({
    type: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default Transaction;
