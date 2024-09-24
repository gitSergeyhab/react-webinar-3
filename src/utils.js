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
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const getTitle = (value, error, isLoading) => {
  if (isLoading) return 'Загрузка...';
  if (error) return 'Произошла ошибка';
  return value;
}
export const getArticlesUri = (limit, skip) =>
  `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`;


export const getPageValue = (thisPage, limit, skip, count) => {
    const currentPage = skip / limit + 1;
    const isNearCurrent = (thisPage >  currentPage - 2) && (thisPage < currentPage + 2);
    const lastPage = Math.ceil(count / limit)
    const isLast = lastPage === thisPage;
    const beforePage = Math.floor(currentPage / 2 )
    const afterPage = Math.ceil((currentPage + lastPage + 1) / 2)
    const isThirdAndCurrentFirst = (thisPage === 3 && currentPage === 1);
    const isThirdFromEndAndCurrentLast = (thisPage === lastPage - 2 && currentPage === lastPage);
    if (isNearCurrent || isLast || thisPage === 1 || isThirdAndCurrentFirst || isThirdFromEndAndCurrentLast)
      return thisPage;
    if (beforePage === thisPage || afterPage === thisPage) return '...'
    return null
}


export const getPagesData = (limit, skip, count) =>
  new Array(Math.ceil(count / limit)).fill(0)
    .map((_, i) => ({
      page: i+1,
      value: getPageValue(i+1, limit, skip, count),
      isCurrent: i+1 === skip / limit + 1
    }))
