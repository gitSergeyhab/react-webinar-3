import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import ProductProperty from '../product-property';
import { numberFormat } from '../../utils';
import './style.css';
import { useTranslate } from '../../hooks/useTranslate';

function ProductContent({ product, addToBasket, isLoading}) {
  const cn = bem('ProductContent');
  const translate = useTranslate()

  if(isLoading) {
    return <div className={cn()}>Загрузка...</div>
  }
  if (!product) return null

  const {madeIn, category, description, edition, price, _id} = product
  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <ProductProperty name={translate('madeIn')} value={madeIn.title}/>
      <ProductProperty name={translate('category')} value={category.title}/>
      <ProductProperty name={translate('edition')} value={edition}/>
      <div className={cn('price')}>{translate('price')}: {numberFormat(price)} ₽</div>
      <button onClick={() => addToBasket(_id, product)}>{translate('add')}</button>
    </div>
  );
}

ProductContent.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.shape({
    price: PropTypes.number,
    edition: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    madeIn: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  addToBasket: PropTypes.func,
};

export default memo(ProductContent);
