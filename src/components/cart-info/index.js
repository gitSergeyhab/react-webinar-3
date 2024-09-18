import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Controls from '../controls';
import { getCartInfoText } from '../../utils';
import './style.css';

// Дополнительная задача
// Поддержка defaultProps в будущих версиях React будет удалена.
// Уже сейчас в консоль браузера вываливаются предупреждения об этом.
// Необходимо заменить defaultProps на другой способ указания свойствам значений по умолчанию.
function CartInfo({sum = 0, count = 0, onOpenModal = () => {}}) {
  const cn = bem('CartInfo');

  return (
    <div className={cn()}>
      <div> В корзине</div>
      <div className={cn('number')}>
      {getCartInfoText({count, sum})}
      </div>
      <Controls openCart={onOpenModal} />
    </div>
  );
}

CartInfo.propTypes = {
  sum: PropTypes.number,
  count: PropTypes.number,
  onOpenModal: PropTypes.func,
};

export default CartInfo
