/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addToCart(code) {
    const cart = this.state.cart
    const cartItem = cart.get(code)

    if (cartItem) {
      cart.set(code, {...cartItem, count: cartItem.count + 1})
    } else {
      const product = this.state.list.find(item => item.code === code)
      if (!product) {
        console.error(`Товар с кодом ${code} не найден в списке товаров`);
        return;
      }
      cart.set(code, {...product,  count: 1})
    }

    this.setState({...this.state, cart});
  }

  deleteFromCart(code) {
    const cart = this.state.cart
    const product = cart.get(code)
    if (!product) {
      console.error(`Товар с кодом ${code} не найден в корзине`)
      return;
    }
    cart.delete(code)
    this.setState({...this.state, cart});
  }
}

export default Store;
