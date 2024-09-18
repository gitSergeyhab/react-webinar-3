import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Controls({ openCart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={() => openCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  openCart: PropTypes.func.isRequired,
};


export default React.memo(Controls);
