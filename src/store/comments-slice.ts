import { MAX_COUNT_OF_REVIEWS } from './../const/const';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/types';
import { sortComments } from '../utils';

export interface State {
  comments: Comment[];
}

const initialState: State = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state: State, action: PayloadAction<Comment[]>) => {
      const sortedCommentsByDate = sortComments(action.payload);
      state.comments = sortedCommentsByDate.length > MAX_COUNT_OF_REVIEWS ? sortedCommentsByDate.slice(0, MAX_COUNT_OF_REVIEWS) : sortedCommentsByDate;
    },
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
