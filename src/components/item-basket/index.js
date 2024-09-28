import { memo } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { noTranslate } from '../../utils/translate-plural-utils';
import './style.css';


function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const translate = props.translate || noTranslate

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link
        to={`/products/${props.item._id}`}
        className={cn('title')}
        onClick={props.onClick}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('delete')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onClick: propTypes.func,
  translate: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClick: () => {},
};

export default memo(ItemBasket);
