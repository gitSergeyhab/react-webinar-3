import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { languageDict } from '../../const';
import './style.css';

function LanguageButton({langKey}) {
  const cn = bem('LanguageButton');
  const store = useStore()
  const currentLangKey = useSelector(state => state.language.key);

  const callbacks = {
    changeLanguage: (lang) => store.actions.language.setLanguage(lang),
  };

  return (
    <button
      className={cn({current: langKey === currentLangKey})}
      onClick={() => callbacks.changeLanguage(langKey)}
    >
      {languageDict[langKey].name}
    </button>
  );
}

export default memo(LanguageButton);
