import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function Portal(props) {
  const element = document.querySelector(props.selector);
  return element ? createPortal(props.children, element) : null;
}

Portal.propTypes = {
  selector: PropTypes.string,
  children: PropTypes.node,
};

export default Portal
