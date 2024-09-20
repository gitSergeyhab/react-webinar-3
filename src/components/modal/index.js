import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === 'Escape') props.onClose()
    }

    document.body.addEventListener('keydown', onEscape)
    document.body.style.setProperty('overflow-y', 'hidden');

    return () => {
      document.body.removeEventListener('keydown', onEscape)
      document.body.style.removeProperty('overflow-y');
    }
  }, [])

  return (
  <div className={cn()} onClick={props.onClose} >
    <div className={cn('content')} onClick={(e) => e.stopPropagation()} >
      {props.children}
    </div>
  </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Modal)
