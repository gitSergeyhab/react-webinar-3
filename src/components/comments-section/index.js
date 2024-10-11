import { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentList from '../comment-list';
import CommentForm from '../comment-form';
import CommentNoAuth from '../comment-no-auth';
import listToTree from '../../utils/list-to-tree';
import './style.css';


function CommentsSection({comments, count, t = text => text, articleId, onAdd, userId})  {
  const cn = bem('CommentsSection');
  const [openCommentId, setOpenCommentId] = useState(null);

  const commentsTree = useMemo(() => listToTree(comments)[0]?.children || [], [comments]);

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
          userId={userId}
          level={1}
          t={t}
        />
        )}
      {Boolean(userId) && !openCommentId && (
        <CommentForm
          onAdd={callbacks.onAddComment}
          title={t('comments.new-comment')}
          parentId={articleId}
          onCancel={callbacks.onCancel}
          t={t}
          />
        )}
        {!userId && !openCommentId && (
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
  userId: PropTypes.string,
};

export default memo(CommentsSection);
