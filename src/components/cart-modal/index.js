import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../portal';
import Modal from '../modal';
import Cart from '../cart';

function CartModal(props) {
  return (
    <Portal selector='#modal'>
      <Modal onClose={props.onCloseModal}>
        <Cart
          onClose={props.onCloseModal}
          onDeleteCartItem={props.onDeleteFromCart}
          cart={props.cart}
        />
      </Modal>
    </Portal>
  );
}

CartModal.propTypes = {
  cart: PropTypes.instanceOf(Map),
  onCloseModal: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};

export default CartModal;
