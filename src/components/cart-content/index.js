import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import CartResult from '../cart-result';
import CartItem from '../cart-item';
import './style.css';


function CartContent(props) {
  const cn = bem('CartContent');
  const cartList = [...props.cart.values()];

  if (!cartList.length) {
    return <p className={cn('empty')}>Корзина пуста</p>
  }

  return (
    <>
      <List list={cartList} renderItem={(item) => (
        <CartItem item={item} onDeleteFromCart={props.onDeleteCartItem} key={item.code}/>
      )}/>
      <CartResult sum={props.sum}/>
    </>
  );
}

CartContent.propTypes = {
  sum: PropTypes.number.isRequired,
  cart: PropTypes.instanceOf(Map).isRequired,
  onDeleteCartItem: PropTypes.func.isRequired,
};

export default CartContent
