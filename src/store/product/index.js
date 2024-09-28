import { getArticleUri } from '../../utils/api-utils';
import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      data: null,
      error: '',
      isLoading: false,
      cash: {}
    };
  }

  getFromCash(id) {
    const product = this.getState().cash[id];
    return product || null;
  }
  async load(id) {
    try {
      this.setState({...this.getState(), isLoading: true});
      const response = await fetch(getArticleUri(id));
      const json = await response.json();
      const cash = {...this.getState().cash, [id]: json.result }
      this.setState({...this.getState(), data: json.result, error: '', cash });
    } catch (e) {
      console.error(e);
      this.setState({...this.getState(), error: 'Произошла ошибка'});
    } finally {
      this.setState({...this.getState(), isLoading: false});
    }
  }

  async setProduct(id) {
    const cashedProduct = this.getFromCash(id);
    if (cashedProduct) {
      this.setState({...this.getState(), data: cashedProduct, error: ''});
      return;
    }
    await this.load(id);
  }
  clear() {
    this.setState({ ...this.getState(), data: null, isLoading: false, error: '' });
  }
}

export default Product;
