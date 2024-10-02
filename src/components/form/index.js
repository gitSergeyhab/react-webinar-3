import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Form ({children, onSubmit, waiting, error, textButton, title, t}) {
  const cn = bem('Form');
  const ref = useRef();

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!ref.current) return;
    const data = Object.fromEntries(new FormData(e.target).entries());
    onSubmit(data, () => ref.current.reset());
  }

  return (
    <form className={cn()} onSubmit={onSubmitForm} ref={ref}>
      <h2 className={cn('title')}>{title}</h2>
      {children}
      {error && <div className={cn('error')}>{error}</div>}
      <button disabled={waiting} type="submit" className={cn('button')}>
        {textButton || t('submit.send')}
      </button>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  waiting: PropTypes.bool,
  error: PropTypes.string,
  textButton: PropTypes.string,
  title: PropTypes.string,
  t: PropTypes.func,
};

Form.defaultProps = {
  t: text => text,
};

export default memo(Form);
