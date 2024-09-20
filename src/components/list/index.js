import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

// Через children было бы проще, но я так понял, что имелось в виду именно это:

function List(props) {
  const cn = bem('List');
  return (
    <div className={cn()}>
      {props.list.map(item => (
        <div key={item.code} className={cn('item')}>
          {props.renderItem(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default React.memo(List);
