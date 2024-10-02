import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Form from '../../components/form';
import FormInput from '../../components/form-input';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';

function Login() {
  const store = useStore();
  const { t } = useTranslate();

  const {waiting, error} = useSelector(state => ({
    waiting: state.user.waiting,
    error: state.user.error
  }));

  const callbacks = {
    onSubmit: useCallback((data, onSuccess) => store.actions.user.sign(data, onSuccess), [store]),
  };

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={waiting}>
        <Form onSubmit={callbacks.onSubmit} waiting={waiting} error={error} textButton='Войти'>
          <h2>Вход</h2>
          <FormInput label='Логин' name='login' required />
          <FormInput label='Пароль' name='password' type='password' required />
        </Form>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);

