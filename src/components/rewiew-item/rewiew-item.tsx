import { Comment } from '../../types/types';
import dayjs from 'dayjs';

type Props = {
  comment: Comment;
}

export default function RewiewItem({ comment }: Props): JSX.Element {
  const date = dayjs(comment.date).format('MMMM DD');

  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img className='reviews__avatar user__avatar' src={comment.user.avatarUrl} width='54' height='54' alt='Reviews avatar' />
        </div>
        <span className='reviews__user-name'>
          {comment.user.name}
        </span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{ 'width': `${comment.rating * 20}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>
          {comment.comment}
        </p>
        <time className='reviews__time'>{date}</time>
      </div>
    </li>
  );
}
