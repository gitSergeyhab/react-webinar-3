import { ARTICLES_LIMIT, ARTICLES_SKIP } from '../../const';
import { getArticlesUri } from '../../utils/api-utils';
import { codeGenerator } from '../../utils/number-utils';
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

  async load(page) {
    const {limit} = this.getState()
    const skip = (page - 1) * limit
    const response = await fetch(getArticlesUri(limit, skip));
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        skip,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
