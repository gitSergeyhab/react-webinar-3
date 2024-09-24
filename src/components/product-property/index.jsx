import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProductProperty({ name, value }) {
  const cn = bem('ProductProperty');

  return (
    <div className={cn()}>
      <div className={cn('name')}>{name}:</div>
      <div className={cn('value')}>{value}</div>
    </div>
  );
}

ProductProperty.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(ProductProperty);
