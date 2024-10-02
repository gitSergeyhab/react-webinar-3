import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css'

function FormInput ({label, type='text', ...props}) {
  const cn = bem('FormInput');
  return (
    <label className={cn()}>
      {label}
      <input className={cn('input')} type={type} {...props} />
    </label>
  );
}

FormInput.propTypes = {
  label:  PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool
};

export default memo(FormInput);
