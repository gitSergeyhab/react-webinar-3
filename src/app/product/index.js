import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import { useFetchProduct } from './useFetchProduct';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductContent from '../../components/product-content';
import { getTitle } from '../../utils';

function Product() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback((_id, item) => store.actions.basket.addToBasket(_id, item), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const {error, isLoading, product} = useFetchProduct(id);
  const pageTitle = getTitle(product?.title, error, isLoading);

  return (
    <PageLayout >
      <Head title={pageTitle} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductContent
        product={product}
        addToBasket={callbacks.addToBasket}
        isLoading={isLoading}
      />
    </PageLayout>
  );
}

export default memo(Product);
