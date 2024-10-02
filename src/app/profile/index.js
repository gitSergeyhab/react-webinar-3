import { memo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    profile: state.user.profile,
    waiting: state.user.authWaiting,
  }));

  return (
    <PageLayout>
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard profile={select.profile || {}} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
