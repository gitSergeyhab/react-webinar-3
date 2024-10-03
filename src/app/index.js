import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import UserBlock from '../components/user-block';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import Spinner from '../components/spinner';
import Profile from './profile';
import ProtectedRoute from '../components/protected-route';
import useTranslate from '../hooks/use-translate';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const { t } = useTranslate();

  useEffect(() => {
    store.actions.user.auth();
    store.actions.category.load()
  }, []);

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    profile: state.user.profile,
    waiting: state.user.authWaiting,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout(), [store]),
  }

  return (
    <>
      <UserBlock
        userName={select.profile?.name}
        waiting={select.authWaiting}
        onLogout={callbacks.onLogout}
        t={t}
      />
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={(
          <ProtectedRoute user={select.profile} waiting={select.waiting}>
            <Profile />
          </ProtectedRoute>
          )} />
      </Routes>
      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
