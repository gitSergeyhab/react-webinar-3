import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import './style.css';

const MIN_LEVEL_INDENT = 2;
const MAX_LEVEL_INDENT = 5;

function CommentList({comments, onAdd, openCommentId, onCancel, onOpen, t, isChildList, userId, level, children}) {
  const cn = bem('CommentList');
  return (
    <ul className={cn({child: isChildList, indent: level <= MAX_LEVEL_INDENT && level >= MIN_LEVEL_INDENT})}>
      {comments?.map(comment => (
        <li key={comment._id}>
          <Comment
            openCommentId={openCommentId}
            comment={comment}
            onAdd={onAdd}
            onCancel={onCancel}
            onOpen={onOpen}
            userId={userId}
            level={level}
            t={t}
          />
        </li>
      ))}
      {children}
    </ul>
  );
}

CommentList.propTypes = {
  openCommentId: PropTypes.string,
  comments: PropTypes.array,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onOpen: PropTypes.func,
  isChildList: PropTypes.bool,
  userId: PropTypes.string,
  level: PropTypes.number,
  t: PropTypes.func,
  children: PropTypes.node,
};

export default memo(CommentList);
