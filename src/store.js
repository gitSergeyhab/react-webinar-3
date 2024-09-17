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
    console.log({newState})
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // addToCart(code) {
  //   const cart = this.state.cart
  //   const productDict = this.state.list.reduce((acc, item) => {
  //     acc[item.code] = item;
  //     return acc;
  //   }, {})

  //   if (cart[code]?.count) {
  //     cart[code].count += 1
  //   } else {
  //     cart[code] = {...productDict[code],  count: 1}
  //   }
  //   this.setState({...this.state,cart});
  // }


  addToCart(code) {
    const cart = this.state.cart
    const cartItem = cart.get(code)
    const productDict = this.state.list.reduce((acc, item) => {
      acc[item.code] = item;
      return acc;
    }, {})

    if (cartItem) {
      cart.set(code, {...cartItem, count: cartItem.count + 1})
    } else {
      cart.set(code, {...productDict[code],  count: 1})
    }

    this.setState({...this.state, cart});
  }

  deleteFromCart(code) {
    const cart = this.state.cart
    const cartItem = cart.get(code)

    if (cartItem && cartItem.count > 1) {
      cart.set(code, {...cartItem, count: cartItem - 1})
    } else if (cartItem) {
      cart.delete(code)
    }

    this.setState({...this.state, cart});
  }
}

export default Store;
