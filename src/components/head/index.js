import { memo } from 'react';
import PropTypes from 'prop-types';
import { languages } from '../../const';
import LanguageButton from '../language-button';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div>
        {languages.map(lang =>  <LanguageButton key={lang} langKey={lang}/>)}
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
