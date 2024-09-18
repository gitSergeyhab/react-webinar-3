/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
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
 * Генератор чисел с шагом 1
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
})();

/**
 * Вычисляет цену и количество всех продуктов в корзине
 * @param {Map} cartMap
 * @returns {{sum: 0, count:0}}
 */
export const getCartInfo = (cartMap) => [...cartMap.values()]
  .reduce((acc, item) => {
    const sum = acc.sum + item.price * item.count;
    const count = acc.count + (item.count ? 1 : 0);
    return {sum, count}
  }, {sum: 0, count:0})


  /**
   *  возвращает число в формате строки 1234567 => '1 234 567'
   * @param {number} price
   * @returns {string}
   */
  export const formatNumber = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/**
 * формирует информацию по корзине
 * @param {{sum: number, count: number}} param0
 * @returns {string}
 */
  export const getCartInfoText = ({sum, count}) => {
    if (!count) return 'Пусто';
    return `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatNumber(sum)} ₽`
  }
