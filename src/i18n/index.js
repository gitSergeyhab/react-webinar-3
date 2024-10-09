// import translate from "./translate";

import translate from "./translate";

// class I18nService {
//   constructor( services, config = {}) {
//     console.log({ config });
//     this.services = services;
//     const storageLang = localStorage.getItem('lang');
//     this.lang = storageLang || config.defaultLang;
//     console.log(this.lang, 'I18nService');
//     this.subscribers = [];
//   }

//   /**
//    * Устанавливает язык
//    * @param {string} newLang
//    */



//   getLang = () => {
//     return this.lang;
//   }


//   subscribe = (callback) => {
//     this.subscribers.push(callback);
//   }

//   // Оповещение подписчиков
//   notifySubscribers = () =>{
//     this.subscribers.forEach(callback => callback(this.lang));
//   }

//   // setLang(newLang) {
//   //   this.lang = newLang;
//   //   this.notifySubscribers(); // Оповещаем подписчиков об изменении языка
//   // }

//   setLang = (newLang) => {
//     // console.log({ newLang }, 'setLang', this.lang);
//     localStorage.setItem('lang', newLang);
//     this.lang = newLang;
//     this.notifySubscribers();
//   }

//   setSubscribers = (subscribers) => {
//     this.subscribers = subscribers;
//   }

//   getSubscribers = () => {
//     return this.subscribers;
//   }
//   /**
//    * Перевод текста на текущий язык
//    * @param {string} text
//    * @param {number} [number]
//    * @returns {string}
//    */
//   translate = ({text, number, lang}) => {
//     return translate(lang || this.lang, text, number);
//   }
// }

// export default I18nService;

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
