import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { getCartInfo } from './utils';
import CartInfo from './components/cart-info';
import Portal from './components/portal';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart
  const [isModalOpen, setModalOpen] = useState(false);
  const {count, sum } = getCartInfo(cart)

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code)
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code)
    }, [store]),

    onCloseModal: useCallback(() => {
      setModalOpen(false)
    }, []),

    onOpenModal: useCallback(() => {
      setModalOpen(true)
    }, []),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartInfo
        count={count}
        sum={sum}
        onOpenModal={callbacks.onOpenModal}
      />
      <List
        list={list}
        onButtonClick={callbacks.onAddToCart}
        buttonItemTitle='Добавить'
      />
      {isModalOpen && (
        <Portal selector='#modal'>
          <Modal onClose={callbacks.onCloseModal}>
            <Cart
              onClose={callbacks.onCloseModal}
              onDeleteCartItem={callbacks.onDeleteFromCart}
              cart={cart}
              sum={sum}
            />
          </Modal>
        </Portal>
        )}
    </PageLayout>
  );
}

export default App;
