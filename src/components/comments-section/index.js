import { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentList from '../comment-list';
import CommentForm from '../comment-form';
import CommentNoAuth from '../comment-no-auth';
import { commentsToTree } from '../../utils/comments-to-tree';
import './style.css';

function CommentsSection({comments, count, t = text => text, articleId, onAdd, isAuth})  {
  const cn = bem('CommentsSection');
  const [openCommentId, setOpenCommentId] = useState(null);

  const commentsTree = useMemo(() => commentsToTree(comments), [comments]);

  const callbacks = {
    onCancel: () => setOpenCommentId(null),
    onAddComment: (text, onSuccess) => onAdd({parent: {_type: 'article', _id: articleId}, text}, onSuccess)
  }

  return (
    <section className={cn()}>
      <h2 className={cn('title')}>
        {t('comments.title')}({count})
      </h2>
      {!!commentsTree?.length && (
        <CommentList
          comments={commentsTree}
          onAdd={onAdd}
          openCommentId={openCommentId}
          onCancel={callbacks.onCancel}
          onOpen={setOpenCommentId}
          isAuth={isAuth}
          t={t}
        />
        )}
      {isAuth && !openCommentId && (
        <CommentForm
          onAdd={callbacks.onAddComment}
          title={t('comments.new-comment')}
          parentId={articleId}
          onCancel={callbacks.onCancel}
          t={t}
          />
        )}
        {!isAuth && !openCommentId && (
          <CommentNoAuth text={t('comments.not-auth-text-comment')} t={t}/>
        )}
    </section>
  );
}

CommentsSection.propTypes = {
  articleId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  count: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default memo(CommentsSection);
