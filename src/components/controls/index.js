import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ openCart }) {
  return (
    <div className="Controls">
      <button onClick={() => openCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  openCart: PropTypes.func,
};


export default React.memo(Controls);
