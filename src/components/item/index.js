import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatNumber } from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: () => props.onButtonClick(props.item),
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('content')}>
        <span>{props.item.title}</span>
        <div className={cn('numbers')}>
          <div>{formatNumber(props.item.price)} &#8381;</div>
          {
            props.item.count ? <div className={cn('count')}>{props.item.count} шт</div> : null
          }
        </div>

      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>{props.buttonTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};

export default React.memo(Item);
