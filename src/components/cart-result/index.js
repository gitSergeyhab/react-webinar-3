import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatNumber } from '../../utils';
import './style.css';

function CartResult(props) {
  const cn = bem('CartResult');

  return (
    <div className={cn()}>
      <div>
        Итого
      </div>
      <div className={cn('sum')}>
        {formatNumber(props.sum)} &#8381;
      </div>
    </div>
  );
}

CartResult.propTypes = {
  sum: PropTypes.number.isRequired,
};

export default CartResult
