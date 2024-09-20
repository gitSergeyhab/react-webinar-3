import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Controls from '../controls';
import { getCartInfoText } from '../../utils';
import './style.css';

function CartInfo({sum = 0, count = 0, onOpenModal = () => {}}) {
  const cn = bem('CartInfo');

  return (
    <div className={cn()}>
      <div> В корзине</div>
      <div className={cn('number')}>
      {getCartInfoText({count, sum})}
      </div>
      <Controls openCart={onOpenModal} />
    </div>
  );
}

CartInfo.propTypes = {
  sum: PropTypes.number,
  count: PropTypes.number,
  onOpenModal: PropTypes.func,
};

export default CartInfo
