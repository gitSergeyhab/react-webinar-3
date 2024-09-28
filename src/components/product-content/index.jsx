import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import ProductProperty from '../product-property';
import { numberFormat } from '../../utils/number-utils';
import './style.css';

function ProductContent({ product, addToBasket, isLoading, label}) {
  const cn = bem('ProductContent');

  if(isLoading) {
    return <div className={cn()}>Загрузка...</div>
  }
  if (!product) return null

  const {madeIn, category, description, edition, price, _id} = product
  return (
    <div className={cn()}>
      <p className={cn('description')}>{description}</p>
      <ProductProperty name={label.madeIn} value={madeIn.title}/>
      <ProductProperty name={label.category} value={category.title}/>
      <ProductProperty name={label.edition} value={edition}/>
      <div className={cn('price')}>{label.price}: {numberFormat(price)} ₽</div>
      <button onClick={() => addToBasket(_id, product)}>{label.buttonText}</button>
    </div>
  );
}

ProductContent.propTypes = {
  isLoading: PropTypes.bool,
  label: PropTypes.shape({
    madeIn: PropTypes.string,
    buttonText: PropTypes.string,
    price: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.string
  }),
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
