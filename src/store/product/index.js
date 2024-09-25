import { getArticleUri } from '../../utils';
import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      data: null,
      error: '',
      isLoading: false
    };
  }

  async load(id) {
    try {
      this.setState({...this.getState(), isLoading: true});
      const response = await fetch(getArticleUri(id));
      const json = await response.json();
      this.setState({...this.getState(), data: json.result, error: ''});
    } catch (e) {
      console.error(e);
      this.setState({...this.getState(), error: 'Произошла ошибка'});
    } finally {
      this.setState({...this.getState(), isLoading: false});
    }
  }
  clear() {
    this.setState({ data: null, isLoading: false, error: '' });
  }
}

export default Product;
