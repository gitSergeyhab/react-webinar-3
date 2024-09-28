import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';

function Menu({ menuItems=[] }) {
  const cn = bem('Menu');
  return (
    <nav className={cn()}>
      {menuItems.map(({ title, href }) => (
        <Link
          className={cn('link')}
          key={title}
          to={href}
        >
          {title}
        </Link>
      ))}
    </nav>
 );
}

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string
  }))
};



export default memo(Menu);
