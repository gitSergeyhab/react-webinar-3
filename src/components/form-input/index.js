import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css'

function FormInput ({type = 'text', name, label, placeholder, required}) {
  const cn = bem('FormInput');
  return (
    <label className={cn()}>
      {label}
      <input type={type} placeholder={placeholder} name={name} required={required} />
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
