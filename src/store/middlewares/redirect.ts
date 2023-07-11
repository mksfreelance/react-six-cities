import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';

export const redirect: Middleware<unknown> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'site/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
