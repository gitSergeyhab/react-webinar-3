import { memo, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import PaginationButton from '../pagination-button';
import { getPagesData } from '../../utils/pagination-utils';
import './style.css';

function Pagination({count, limit, skip, setPage}) {
  const cn = bem('Pagination');

  const pages = useMemo(
    () => getPagesData(limit, skip, count), [limit, skip, count]
  );

  return (
    <div className={cn()}>
      {pages.map(({page, value, isCurrent}) => (
        <PaginationButton
          key={page}
          value={value}
          isCurrent={isCurrent}
          onClick={() => setPage(page)}
        />
      ))}
    </div>
  );
}

Pagination.propTypes = {
    count: PropTypes.number,
    limit: PropTypes.number,
    skip: PropTypes.number,
    setPage: PropTypes.func
};

export default memo(Pagination);
