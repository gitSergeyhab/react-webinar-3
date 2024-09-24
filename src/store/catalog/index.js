import { ARTICLES_LIMIT, ARTICLES_SKIP } from '../../const';
import { codeGenerator, getArticlesUri } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      limit: ARTICLES_LIMIT,
      skip: ARTICLES_SKIP,
      count: 0
    };
  }

  changePage(page) {
    const state = this.getState()
    this.setState({...state, skip: (page - 1) * state.limit})
    this.load();
  }

  async load() {
    const {limit, skip} = this.getState()
    const response = await fetch(getArticlesUri(limit, skip));
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
