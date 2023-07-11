import { ApiRoute } from './../const/const';
import {createAction} from '@reduxjs/toolkit';

export const redirectToRoute = createAction<ApiRoute>('site/redirectToRoute');
