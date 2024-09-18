import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartContent from '../cart-content';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h2>Корзина</h2>
        <button type='button' className={cn('closeBtn')} onClick={props.onClose}>
          Закрыть
        </button>
      </div>
      <div className={cn('content')}>
        <CartContent
          cart={props.cart}
          sum={props.sum}
          onDeleteCartItem={props.onDeleteCartItem}
        />
      </div >
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.instanceOf(Map).isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteCartItem: PropTypes.func.isRequired,
  sum: PropTypes.number.isRequired,
};

export default Cart
