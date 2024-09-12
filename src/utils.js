const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * выбирает слово в соответствии с числом
 * @param {string} form1
 * @param {string} form2
 * @param {string} form3
 * @param {number} count
 */
export const plural = (form1, form2, form3, count) => {
  const mod100 =  count % 100;
  if (mod100 > 4 && mod100 < 21) return `${count} ${form3}`;
  const mod10 =  count % 10;
  if (mod10 > 1 && mod10 < 5) return `${count} ${form2}`;
  if (mod10 === 1) return `${count} ${form1}`;
  return `${count} ${form3}`;
}
