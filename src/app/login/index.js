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
      <Form
        onSubmit={callbacks.onSubmit}
        waiting={waiting} error={error}
        textButton={t('auth.login-submit')}
        title={t('auth.login')}
      >
        <FormInput label={t('auth.login-input')} name='login' required />
        <FormInput label={t('auth.password')} name='password' type='password' required />
      </Form>
    </PageLayout>
  );
}

export default memo(Login);

