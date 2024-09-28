import { languageDict } from "../const";
import { dictionary } from "../dictionaries";


/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Переводит
 * @param {string} langKey
 * @param {string} wordKey
 * @param {number} count
 * @returns
 */
export const translate = (langKey, wordKey, count) => {
  const dict = dictionary[langKey];
  const word = dict[wordKey];
  if (!word) {
    console.error('Неизвестное слово', wordKey);
    return wordKey;
  }
  if (count) return plural(count, word, languageDict[langKey].code);
  return typeof word === 'string' ? word : Object.values(word)[0];
};

/**
 * Использовать, если ф-ция перевода не задана
 * @param {string} word
 * @param {number} count
 * @param {string} locale
 * @returns
 */
export const noTranslate = (word, count, locale) => {
  if (typeof word === 'string') return word;
  return plural(count ?? 1, word, locale);
}
