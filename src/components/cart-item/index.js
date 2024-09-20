import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatNumber } from '../../utils';
import './style.css';

// Код и стили в CartItem / CatalogItem повторяются.
// Я б оставил 1 компонент
// или вынес повторяющиеся стили и код в shared - но требования к структуре файлов, озвученные в лекции этого не предусматривают...

function CartItem(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: () => props.onDeleteFromCart(props.item.code),
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('content')}>
        <span>{props.item.title}</span>
        <div className={cn('numbers')}>
          <div>{formatNumber(props.item.price)} &#8381;</div>
          <div className={cn('count')}>{props.item.count} шт</div>
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartItem);
