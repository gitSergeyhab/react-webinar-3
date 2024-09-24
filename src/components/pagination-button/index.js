import { memo } from 'react';
import PropTypes, { number } from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationButton({onClick, value, isCurrent}) {
  const cn = bem('PaginationItem');

  if (value === null) return null;

  return  (
    <button
      onClick={onClick}
      className={cn({points: value === '...'})}
      disabled={isCurrent}
    >
      {value}
    </button>
  );
}

PaginationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCurrent: PropTypes.bool.isRequired,
};

export default memo(PaginationButton);
