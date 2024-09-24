import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const translate = useTranslate()
  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/">{translate('main')}</Link>
      <span className={cn('label')}>{translate('inCart')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${translate('product', amount)} / ${numberFormat(sum)} ₽`
          : translate('empty')}
      </span>
      <button onClick={onOpen}>{translate('go')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
