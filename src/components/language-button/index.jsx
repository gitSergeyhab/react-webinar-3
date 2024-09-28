import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { languageDict } from '../../const';
import './style.css';

function LanguageButton({langKey, isCurrent, onClick}) {
  const cn = bem('LanguageButton');

  return (
    <button
      className={cn({current: isCurrent})}
      onClick={onClick}
    >
      {languageDict[langKey].name}
    </button>
  );
}

LanguageButton.propTypes = {
  langKey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export default memo(LanguageButton);
