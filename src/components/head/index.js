import { memo } from 'react';
import PropTypes from 'prop-types';
import LanguageSelector from '../language-selector';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <LanguageSelector/>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
