import { languageDict, LANGUAGE_KEY } from "../const";
import { dictionary } from "../dictionaries";
import { plural } from "./plural-utils";

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
 * достает язык из localStorage
 * @returns
 */
export const getLanguageFromStorage = () => localStorage.getItem(LANGUAGE_KEY);

/**
 * устанавливает язык в localStorage
 * @param {string} language
 * @returns
 */
export const setLanguageToStorage = (language) => localStorage.setItem(LANGUAGE_KEY, language)
