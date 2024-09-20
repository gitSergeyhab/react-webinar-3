import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatNumber } from '../../utils';
import './style.css';

function CatalogItem(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: () => props.onAddToCart(props.item.code),
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('content')}>
        <span>{props.item.title}</span>
        <div className={cn('numbers')}>
          <div>{formatNumber(props.item.price)} &#8381;</div>
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(CatalogItem);
