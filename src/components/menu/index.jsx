import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { noTranslate } from '../../utils/translate-plural-utils';

const menuItems = [{ title: 'main', href: '/' }]

function Menu({ translate=noTranslate }) {
  const cn = bem('Menu');
  return (
    <nav className={cn()}>
      {menuItems.map(({ title, href }) => (
        <Link
          className={cn('link')}
          key={title}
          to={href}
        >
          {translate(title)}
        </Link>
      ))}
    </nav>
 );
}

Menu.propTypes = {
  translate: PropTypes.func
};



export default memo(Menu);
