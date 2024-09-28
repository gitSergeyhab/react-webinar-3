import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductContent from '../../components/product-content';
import { getTitle } from '../../utils';
import MenuBasketTool from '../../components/menu-basket-tool';
import Menu from '../../components/menu';
import { useTranslate } from '../../hooks/use-translate';

function Product() {
  const { id } = useParams();
  const store = useStore();
  const translate = useTranslate()

  useEffect(() => {
    store.actions.product.setProduct(id);
    return () => {
      store.actions.product.clear()
    };
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.data,
    error: state.product.error,
    isLoading: state.product.isLoading,
  }));

  const callbacks = {
    addToBasket: useCallback((_id, item) => store.actions.basket.addToBasket(_id, item), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const pageTitle = getTitle(select.product?.title, select.error, select.isLoading);

  return (
    <PageLayout >
      <Head title={pageTitle} />
      <MenuBasketTool>
        <Menu translate={translate}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          translate={translate}
        />
      </MenuBasketTool>
      <ProductContent
        product={select.product}
        addToBasket={callbacks.addToBasket}
        isLoading={select.isLoading}
        translate={translate}
      />
    </PageLayout>
  );
}

export default memo(Product);
