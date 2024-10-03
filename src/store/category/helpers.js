/**
 * Преобразование данных категорий каталога
 * @param {{_id: string, title: string, parent?: { _id: string }}[]}  data
 * @returns {{_id: string, title: string, children: { _id: string, title: string }[] }[]}
 */
export const toCategoryList = (data) => {
  const roots = [];
  console.log({data})
  const map = data.reduce((acc, item) => {
    acc[item._id] = { _id: item._id, title: item.title, children: [] };
    return acc;
  }, {});

  data.forEach(item => {
    if (item.parent) {
      const parent = map[item.parent._id];
      if (parent) {
        parent.children.push(map[item._id]);
      }
    } else {
      roots.push(map[item._id]);
    }
  });
  return roots;
};

/**
 * Преобразование данных категорий каталога в селект лист
 * @param {{_id: string, title: string, parent?: { _id: string }}[]}  data
 * @returns
 */
export const toSelectCategoryData = (data) => {
  const result = []
  const arr = toCategoryList(data)

  const recurse = (arr, deep) => {
    for (const item of arr) {
      result.push({value: item._id, title: `${new Array(deep).fill('-').join(' ')} ${item.title}`})
      if (item.children) {
        recurse(item.children, deep + 1)
      }
    }
  }
  recurse(arr, 0)
  return result
}
