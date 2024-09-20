import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { getCartInfo } from './utils';
import CartInfo from './components/cart-info';
import Modal from './components/modal';
import Cart from './components/cart';
import CatalogItem from './components/catalog-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const { count, sum } = store.getState().cartResult;

  const [isModalOpen, setModalOpen] = useState(false);

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
      <List list={list} renderItem={(item) =>
        <CatalogItem item={item} onAddToCart={callbacks.onAddToCart} key={item.code}/>}
      />
      {isModalOpen && (
        <Modal onClose={callbacks.onCloseModal}>
          <Cart
            onClose={callbacks.onCloseModal}
            onDeleteCartItem={callbacks.onDeleteFromCart}
            cart={cart}
            sum={sum}
          />
        </Modal>
        )}
    </PageLayout>
  );
}

export default App;
