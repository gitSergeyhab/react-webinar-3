import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import Head from '../head';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');
  const cartList = [...props.cart.values()];

  console.log('Cart')

  return (
    <div className={cn()}>
      <Head>
        <h2>Корзина</h2>
        <button type='button' className={cn('closeBtn')} onClick={props.onClose}>
          Закрыть
        </button>
      </Head>
      <div className={cn('content')}>
        {
          cartList.length ?
          <List
            list={cartList}
            onButtonClick={props.onDeleteCartItem}
            buttonItemTitle='Удалить'
          /> :
          <p className={cn('empty')}>Корзина пуста</p>
        }
      </div >
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.instanceOf(Map),
  onClose: PropTypes.func,
  onDeleteCartItem: PropTypes.func,
};

export default Cart
