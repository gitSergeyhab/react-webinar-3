/**
 * Возвращает заголовок для продукта
 * @param {string} value
 * @param {string} error
 * @param {boolean} isLoading
 * @returns
 */
export const getProductTitle = (value, error, isLoading) => {
  if (isLoading) return 'Загрузка...';
  if (error) return 'Произошла ошибка';
  return value;
}
