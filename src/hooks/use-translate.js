import { useState, useEffect } from 'react';
import useServices from './use-services';

export default function useTranslate() {
  const { i18n } = useServices(); // Получаем I18nService через сервисы
  const [lang, setLangState] = useState(i18n.getLang());

  // Подписываемся на изменения языка при монтировании компонента
  useEffect(() => {
    const handleLangChange = (newLang) => {
      setLangState(newLang); // Обновляем состояние языка
    };

    // Подписка на изменения в I18nService
    i18n.subscribe(handleLangChange);

    // Отписываемся при размонтировании компонента
    return () => {
      i18n.unsubscribe(handleLangChange);
    };
  }, [i18n]);

  // Функция для изменения языка
  const setLang = (newLang) => {
    i18n.setLang(newLang); // Вызываем метод setLang из I18nService
  };

  // Возвращаем функцию перевода и изменения языка
  const translate = (text, number) => {
    return i18n.translate(text, number);
  };

  return { t: translate, lang, setLang }; // Возвращаем перевод, текущий язык и функцию для его изменения
}
