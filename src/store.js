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

  addToCart(product) {
    const cart = this.state.cart
    const cartItem = cart.get(product.code)

    if (cartItem) {
      cart.set(product.code, {...cartItem, count: cartItem.count + 1})
    } else {
      cart.set(product.code, {...product,  count: 1})
    }

    this.setState({...this.state, cart});
  }

  deleteFromCart(product) {
    const cart = this.state.cart
    cart.delete(product.code)
    this.setState({...this.state, cart});
  }
}

export default Store;
