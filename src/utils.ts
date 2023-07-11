import { Comment } from './types/types';
import dayjs from 'dayjs';

export const getRandomEnumValue = (anEnum: Record<string, unknown>) => {
  const enumValues = Object.keys(anEnum);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

export function sortComments(comments: Comment[]) {
  return comments.sort((reviewA, reviewB) => dayjs(reviewB.date).diff(dayjs(reviewA.date)));
}
