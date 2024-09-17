import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart
  const [isModalOpen, setModalOpen] = useState(false)

  console.log({isModalOpen})

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
      <Head><h1>Магазин</h1></Head>
      <Controls openCart={callbacks.onOpenModal} />
      <List
        list={list}
        onButtonClick={callbacks.onAddToCart}
        buttonItemTitle='Добавить'
      />
      {isModalOpen && (
        <CartModal
          cart={cart}
          onCloseModal={callbacks.onCloseModal}
          onDeleteFromCart={callbacks.onDeleteFromCart}
        />
        )}
    </PageLayout>
  );
}

export default App;
