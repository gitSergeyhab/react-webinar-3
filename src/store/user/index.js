import { api } from '../../api';
import { AUTH_TOKEN } from '../../const';
import StoreModule from '../module';
import { getUserProfileFromUser } from './helper';

class UserState extends StoreModule {
  initState() {
    return {
      profile: null,
      waiting: false,
      error: '',
      authWaiting: true,
    };
  }

  async auth() {
    this.setState({
      profile: null,
      authWaiting: true,
    });

    try {
      const response = await api({
        url: `/users/self`,
        method: 'GET',
      })

      this.setState(
        {
          profile: getUserProfileFromUser(response.result),
          authWaiting: false,
        }, 'авторизация',
      );
    } catch (e) {
      this.setState({
        profile: null,
        authWaiting: false,
      }, 'ошибка авторизации');
    }
  }

  async logout() {
    try {
      await api({
        url: '/users/sign',
        method: 'DELETE',
      });

      this.setState({
        profile: null,
      }, 'выход из аккаунта');
      localStorage.removeItem(AUTH_TOKEN);
    } catch (e) {
      console.error('не удалось выйти из аккаунта', e)
    }
  }
  resetError() {
    this.setState({ ...this.getState(), error: ''});
  }

  async sign(data, onSuccess) {
    this.setState({
      profile: null,
      waiting: true,
    });
    try {
      const response = await api({
        url: '/users/sign',
        method: 'POST',
        data: JSON.stringify(data),
      });
      localStorage.setItem(AUTH_TOKEN, response.result.token);
      onSuccess();
      this.setState(
        {
          profile: getUserProfileFromUser(response.result.user),
          waiting: false,
          error: ''
        }, 'вход в аккаунт',
      );
    } catch (error) {
      this.setState({
        profile: null,
        waiting: false,
        error: error.message
      }, 'ошибка входа в аккаунт');
    }
  }
}

export default UserState;
