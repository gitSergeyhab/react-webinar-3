import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';


function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: () => {
      props.onButtonClick(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('content')}>
        <span>{props.item.title}</span>
        <div className={cn('numbers')}>
          <span>{props.item.price} &#8381;</span>
          {
            props.item.count ? <span>{props.item.count} шт</span> : null
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
  }).isRequired,
  onButtonClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

// Item.defaultProps = {
//   onButtonClick: () => {},
// };

export default React.memo(Item);
