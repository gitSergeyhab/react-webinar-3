import { memo, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationButton from '../pagination-button';
import { getPagesData } from '../../utils';
import './style.css';

function LanguageButton() {
  const cn = bem('Pagination');
  const store = useStore();

  const {count, limit, skip} = useSelector(state => ({
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
  }));

  const pages = useMemo(
    () => getPagesData(limit, skip, count), [limit, skip, count]
  );

  const callbacks = {
    onClick: (page) => store.actions.catalog.changePage(page),
  };

  return (
    <div className={cn()}>
      {pages.map(({page, value, isCurrent}) => (
        <PaginationButton
          key={page}
          value={value}
          isCurrent={isCurrent}
          onClick={() => callbacks.onClick(page)}
        />
      ))}
    </div>
  );
}

export default memo(LanguageButton);
