import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import MenuBasketTool from '../../components/menu-basket-tool';
import Menu from '../../components/menu';
import { useTranslate } from '../../hooks/use-translate';

function Main() {
  const store = useStore();
  const translate = useTranslate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.key,
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setPage: useCallback(page => store.actions.catalog.changePage(page), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate('store')}/>
      <MenuBasketTool>
        <Menu translate={translate} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          translate={translate}
        />
      </MenuBasketTool>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        count={select.count}
        limit={select.limit}
        skip={select.skip}
        setPage={callbacks.setPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
