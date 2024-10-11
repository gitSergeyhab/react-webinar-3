import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentList from '../comment-list';
import CommentForm from '../comment-form';
import { toCommentDate } from '../../utils/date';
import CommentNoAuth from '../comment-no-auth';
import './style.css';
import { Link } from 'react-router-dom';

function Comment({comment, openCommentId, onCancel, onAdd, onOpen, userId, t = text => text, level }) {
  const { author, text, dateCreate, isDeleted, children, _id } = comment;
  const cn = bem('Comment');
  const onAddAnswer = (text, onSuccess) => onAdd({parent: {_id, _type: 'comment'}, text}, onSuccess)

  const isFormShow = Boolean(userId) && openCommentId === _id;

  const formItem = useRef(null)

  useEffect(() => {
    if (isFormShow && formItem.current) {
      formItem.current.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
  }, [isFormShow])

  return (
    <div className={cn()}>
      <div className={cn('user-date')}>
        <div className={cn('user', {current: userId === author._id})}>{author.profile.name}</div>
        <div className={cn('date')}>{toCommentDate(dateCreate)}</div>
      </div>
      <p className={cn('text')}>{ isDeleted ? t('comments.deleted-comment') : text}</p>
      <button className={cn('answer-btn')} onClick={() => onOpen(_id)}>
        {t('comments.answer')}
      </button>
      {!userId && openCommentId === _id && (
        <CommentNoAuth
          onCancel={onCancel}
          buttonText={t('comments.cancel')}
          text={t('comments.not-auth-text-answer')}
          t={t}
        />
      )}
      {(!!children?.length || isFormShow) && (
        <CommentList
          comments={children}
          onAdd={onAdd}
          openCommentId={openCommentId}
          onCancel={onCancel}
          onOpen={onOpen}
          userId={userId}
          level={level + 1}
          t={t}
        >
          {isFormShow && (
            <li ref={formItem}>
              <CommentForm
                onAdd={onAddAnswer}
                onCancel={onCancel}
                title={t('comments.new-answer')}
                cancelButtonText={t('comments.cancel')}
                t={t}
              />
            </li>
            )}
        </CommentList>
        )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    children: PropTypes.array,
    _id: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      _id: PropTypes.string,
      _type: PropTypes.oneOf(['article', 'comment']),
    }),
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  onCancel: PropTypes.func,
  onAdd: PropTypes.func,
  onOpen: PropTypes.func,
  userId: PropTypes.string,
  t: PropTypes.func,
  level: PropTypes.number,
};

export default memo(Comment);
