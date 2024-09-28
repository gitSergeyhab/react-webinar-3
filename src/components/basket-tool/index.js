import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { noTranslate } from '../../utils/translate-plural-utils';
import './style.css';


function BasketTool({ sum, amount, onOpen, translate = noTranslate}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
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
  translate: PropTypes.func,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  // translate: key => key,
};

export default memo(BasketTool);
