import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, Comment, CommentData, Offer, OfferStatusData, UserData } from '../types/types';
import { AppDispatch, RootState } from './index';
import { ApiRoute, AuthorizationStatus, OfferId } from '../const/const';
import { setNearbyOffers, setOffers } from './offers-slice';
import { setComments } from './comments-slice';
import { dropToken, saveToken } from '../services/token';
import { setAuthStatus, setUserData } from './user-slice';
import { redirectToRoute } from './action';

type settingsType = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, settingsType>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    dispatch(setOffers(data));
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], number, settingsType>(
  'data/fetchComments',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Comment[]>(`${ApiRoute.Reviews}/${id}`);
    dispatch(setComments(data));
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, settingsType>(
  'user/checkAuth', async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(ApiRoute.Login);
    dispatch(setUserData(data));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, settingsType>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(redirectToRoute(ApiRoute.Offers));
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, settingsType>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setUserData(undefined));
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, settingsType>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Favorite);
    return data;
  }
);

export const setFavoriteOfferAction = createAsyncThunk<Offer, OfferId, settingsType>(
  'data/setFavoriteOffer',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/1`);
    return data;
  }
);

export const setOfferStatusAction = createAsyncThunk<Offer, OfferStatusData, settingsType>(
  'data/setOfferStatusAction',
  async ({status, id}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/${status}`, {id, status});
    return data;
  },
);

export const fetchOfferInfoAction = createAsyncThunk<Offer, number, settingsType>(
  'data/loadOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
    return data;
  },
);

export const deleteFavoriteOfferAction = createAsyncThunk<Offer, OfferId, settingsType>(
  'data/deleteFavoriteOffer',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/0`);
    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], number, settingsType>(
  'data/fetchNearbyOffers',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);
    dispatch(setNearbyOffers(data));
    return data;
  },
);

export const addReviewAction = createAsyncThunk<Comment, CommentData, settingsType>(
  'data/postReview',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Comment>(`${ApiRoute.Reviews}/${id}`, { comment, rating });
    dispatch(fetchCommentsAction(Number(id)));
    return data;
  },
);
