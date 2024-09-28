import { languages } from '../../const';
import { getLanguageFromStorage, setLanguageToStorage } from '../../utils/translate-utils';
import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      key: getLanguageFromStorage() || languages[0],
    };
  }

  setLanguage(language) {
    this.setState({ key: language }, `Установка языка ${language}`);
    setLanguageToStorage(language)
  }
}

export default Language;
