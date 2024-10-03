import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function UserBlock({ userName, waiting, onLogout, t }) {
  const cn = bem('UserBlock');
  const navigate = useNavigate()

  const callbacks = {
    onLogin: useCallback(() =>{
      const {pathname, search} = window.location
      navigate('/login', {state: {from: pathname + search}})
    }, [navigate, window.location.search, window.location.pathname]),
  };

  if (waiting) {
    return <div className={cn()}>Авторизация...</div>;
  }

  return (
    <div className={cn()}>
      {userName ? (
        <>
          <Link to='/profile'>{userName}</Link>
          <button onClick={onLogout}>{t('auth.logout')}</button>
        </>
      ): (
        <button onClick={callbacks.onLogin}>{t('auth.login')}</button>
      )}
    </div>
  );
}

UserBlock.propTypes = {
  t: PropTypes.func,
  userName: PropTypes.string,
  waiting: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default memo(UserBlock);
