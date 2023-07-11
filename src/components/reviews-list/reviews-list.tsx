import { Comment } from '../../types/types';
import ReviewItem from '../rewiew-item/rewiew-item';

type Props = {
  comments: Comment[];
}

export default function ReviewsList({ comments }: Props): JSX.Element {
  if (comments.length === 0) {
    return <p>Nothing yet commented.</p>;
  }
  return (
    <section className='property__reviews reviews'>
      <div>
        <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{comments.length}</span></h2>

        <ul className='reviews__list'>
          {comments.map((comment) => (
            <ReviewItem
              comment={comment} key={comment.id}
            />
          ))}
        </ul >
      </div>
    </section>
  );
}

