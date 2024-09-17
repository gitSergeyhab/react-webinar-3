import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartResult(props) {
  const cn = bem('CartResult');


  return (
  <div>

  </div>
  );
}

CartResult.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};



export default CartResult
