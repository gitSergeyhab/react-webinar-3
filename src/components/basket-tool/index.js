import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils/number-utils';
import './style.css';

function BasketTool({ sum, amount, onOpen, label}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{label.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${label.totalAmount} / ${numberFormat(sum)} ₽`
          : label.totalEmpty}
      </span>
      <button onClick={onOpen}>{label.buttonText}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  label: PropTypes.shape ({
    inCart: PropTypes.string,
    totalAmount: PropTypes.string,
    totalEmpty: PropTypes.string,
    buttonText: PropTypes.string,
  }).isRequired
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
