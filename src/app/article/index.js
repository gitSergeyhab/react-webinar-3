import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import CommentsSection from '../../components/comments-section';
import useSelector from '../../hooks/use-selector';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();
  const { t, lang } = useTranslate();


  useInit(() => {
    dispatch(articleActions.load(params.id));
  }, [params.id, lang]);

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]); // комментам язык не нужен

  const select = useSelectorRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.items,
      commentsCount: state.comments.count,
      commentsWaiting: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {userId, userName, u} = useSelector(
    state => ({
      userName: state.session.user?.profile?.name,
      userId: state.session.user?._id,
    }),
  );


  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback((data, onSuccess) => dispatch(commentsActions.add(data, userName, onSuccess)), [userName]),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={select.commentsWaiting}>
        <CommentsSection
          comments={select.comments}
          count={select.commentsCount}
          articleId={params.id}
          onAdd={callbacks.addComment}
          userId={userId}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
