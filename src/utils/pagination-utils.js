/**
 * Возвращает значение для кнопок пагинации
 * @param {number} thisPage
 * @param {number} limit
 * @param {number} skip
 * @param {number} count
 * @returns
 */
export const getPageValue = (thisPage, limit, skip, count) => {
  const currentPage = skip / limit + 1;
  const isNearCurrent = (thisPage >  currentPage - 2) && (thisPage < currentPage + 2);
  const lastPage = Math.ceil(count / limit)
  const isLast = lastPage === thisPage;
  const beforePage = Math.floor(currentPage / 2)
  const afterPage = Math.ceil((currentPage + lastPage + 1) / 2)
  const isThirdAndCurrentFirst = (thisPage === 3 && currentPage === 1);
  const isThirdFromEndAndCurrentLast = (thisPage === lastPage - 2 && currentPage === lastPage);
  if (isNearCurrent || isLast || thisPage === 1 || isThirdAndCurrentFirst || isThirdFromEndAndCurrentLast)
    return thisPage;
  if (beforePage === thisPage || afterPage === thisPage) return '...'
  return null
}

/**
* Возвращает массив значений для кнопок пагинации
* @param {number} limit
* @param {number} skip
* @param {number} count
* @returns
*/
export const getPagesData = (limit, skip, count) =>
new Array(Math.ceil(count / limit)).fill(0)
  .map((_, i) => ({
    page: i+1,
    value: getPageValue(i+1, limit, skip, count),
    isCurrent: i+1 === skip / limit + 1
  }))
