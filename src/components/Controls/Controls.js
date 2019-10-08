import React from 'react';
import PropTypes from 'prop-types';
import css from './Controls.module.css';

const Controls = ({ amount, handleChange, onDeposit, onWithdraw }) => {
  return (
    <div className={css.container}>
      <section className={css.controls}>
        <input
          onChange={handleChange}
          value={amount}
          placeholder="введите сумму операции..."
          type="number"
          name="amount"
        />
        <button onClick={onDeposit} type="button">
          Deposit
        </button>
        <button onClick={onWithdraw} value={amount} type="button">
          Wihtdraw
        </button>
      </section>
    </div>
  );
};

Controls.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  handleChange: PropTypes.func.isRequired,
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
};

export default Controls;
