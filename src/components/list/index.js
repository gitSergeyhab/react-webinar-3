import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            onButtonClick={props.onButtonClick}
            buttonTitle={props.buttonItemTitle}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onButtonClick: PropTypes.func,
  buttonItemTitle: PropTypes.string,

};

export default React.memo(List);
