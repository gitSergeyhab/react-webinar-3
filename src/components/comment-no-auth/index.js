import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

function CommentNoAuth({ text, onCancel, buttonText, t = text => text}) {
  const cn = bem('CommentNoAuth');
  const {pathname} = useLocation();
  return (
    <div className={cn()}>
      <Link className={cn('link')} state={{back: pathname}} to={`/login`}>
        {t('comments.login-text')}
      </Link>
      <div>{text}</div>
      {buttonText && (
        <button className={cn('button')} onClick={onCancel}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

CommentNoAuth.propTypes = {
  text: PropTypes.string,
  t: PropTypes.func,
  onCancel: PropTypes.func,
  buttonText: PropTypes.string,
};

export default memo(CommentNoAuth);
