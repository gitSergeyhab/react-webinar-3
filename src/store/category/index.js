import { api } from '../../api';
import StoreModule from '../module';
import { toSelectCategoryData } from './helpers';

class CategoryState extends StoreModule {
  initState() {
    return {
      list: [{value: '', title: 'Все'}],
    };
  }

  async load() {
    const loadedData = await api({url: '/categories?fields=_id,title,parent(_id)&limit=*'});
    const categories = toSelectCategoryData(loadedData.result.items);
    this.setState({
      list: [{value: '', title: 'Все'}, ...categories],
    }, 'Загружены категории');
  }
}

export default CategoryState;
