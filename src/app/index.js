import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
