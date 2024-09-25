import { memo } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import LanguageButton from '../language-button';
import { languages } from '../../const';

function LanguageSelector() {
  const store = useStore()
  const currentLangKey = useSelector(state => state.language.key);

  const callbacks = {
    changeLanguage: (lang) => store.actions.language.setLanguage(lang),
  };

  return (
    <div>
      {languages.map(lang =>  (
        <LanguageButton
          key={lang}
          langKey={lang}
          onClick={() => callbacks.changeLanguage(lang)}
          isCurrent={lang === currentLangKey}
        />
      ))}
    </div>
  );
}

export default memo(LanguageSelector);
