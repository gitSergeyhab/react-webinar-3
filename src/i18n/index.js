import translate from "./translate";

class I18nService {
  constructor(config = {}) {
    this.lang = localStorage.getItem('lang') || config.defaultLang || 'ru';
    this.subscribers = [];
  }

  // Подписка на изменение языка
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  // Отписка от изменений языка
  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
  }

  // Оповещение подписчиков об изменении языка
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.lang));
  }

  // Устанавливает новый язык и уведомляет подписчиков
  setLang(newLang) {
    this.lang = newLang;
    localStorage.setItem('lang', newLang);
    this.notifySubscribers();
  }

  // Возвращает текущий язык
  getLang() {
    return this.lang;
  }

  // Метод перевода
  translate(text, number) {
    return translate(this.lang, text, number);
  }
}

export default I18nService;
