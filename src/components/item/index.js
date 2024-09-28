import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom';
import { noTranslate } from '../../utils/translate-plural-utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const translate = props.translate || noTranslate;

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link
        to={`/products/${props.item._id}`}
        className={cn('title')}
      >
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate('add')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  translate: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
