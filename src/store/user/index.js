import { api } from '../../api';
import { getErrorFromResponse } from '../../utils';
import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false,
      error: ''
    };
  }

  async sign(data, onSuccess) {
    this.setState({
      data: {},
      waiting: true,
    });


    try {
      const response = await api({
        url: '/users/sign',
        method: 'POST',
        data
      });
      console.log({response})
      this.setState(
        {
          data: response.result,
          waiting: false,
          error: ''
        },
        'Юзер авторизован',
      );
    } catch (error) {
      console.log({error})
      this.setState({
        data: {},
        waiting: false,
        error: error.message
      });
    }

    // try {
    //   const response = await fetch(
    //     `/api/v1/users/sign`,
    //     {
    //       method: 'POST',
    //       body: data,
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //     }
    //   );
    //   const json = await response.json();
    //   if (!response.ok) {
    //     throw new Error(getErrorFromResponse(json.error));
    //   }
    //   this.setState(
    //     {
    //       data: json.result,
    //       waiting: false,
    //       error: ''
    //     },
    //     'Юзер авторизован',
    //   );
    //   onSuccess()
    // } catch (error) {
    //   this.setState({
    //     data: {},
    //     waiting: false,
    //     error: error.message
    //   });
    // }
  }
}

export default UserState;
