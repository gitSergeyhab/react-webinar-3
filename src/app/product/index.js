import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductContent from '../../components/product-content';
import MenuBasketTool from '../../components/menu-basket-tool';
import Menu from '../../components/menu';
import { useTranslate } from '../../hooks/use-translate';
import { menuItems } from '../../const';
import { getProductTitle } from '../../utils/string-utils';

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

  const pageTitle = getProductTitle(select.product?.title, select.error, select.isLoading);
  const productMenuItems = useMemo(() => menuItems.map(({ title, href }) => ({
    title: translate(title), href
  })));

  return (
    <PageLayout >
      <Head title={pageTitle} />
      <MenuBasketTool>
        <Menu menuItems={productMenuItems}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          label={{
            inCart: translate('inCart'),
            totalAmount: translate('product', select.amount),
            totalEmpty: translate('empty'),
            buttonText: translate('go'),
          }}
        />
      </MenuBasketTool>
      <ProductContent
        product={select.product}
        addToBasket={callbacks.addToBasket}
        isLoading={select.isLoading}
        label={{
          price: translate('price'),
          madeIn: translate('madeIn'),
          category: translate('category'),
          edition: translate('edition'),
          buttonText: translate('add'),
        }}
      />
    </PageLayout>
  );
}

export default memo(Product);
