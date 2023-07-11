import { cityNames } from '../const/const';
import { RootState } from './index';

export const getOffers = (state: RootState) => state.offers.offers;
export const getComments = (state: RootState) => state.comments.comments;
export const getNearbyOffers = (state: RootState) => state.offers.nearbyOffers;
export const getOffersLoading = (state: RootState) => state.offers.isLoadingOffers;
export const getAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const getUserData = (state: RootState) => state.user.userData;
export const getFavoriteOffers = (state: RootState) => state.offers.favoriteOffers;
export const getCurrentOffer = (state: RootState) => state.offers.currentOffer;
export const getCurrentOfferLoadError = (state: RootState) => state.offers.currentOfferLoadError;
export const getCityOffers = (state: RootState) => {
  const cityName = cityNames[state.offers.selectedCity].name;
  return state.offers.offers.filter((offer) => offer.city.name.toLowerCase() === cityName);
};


export const getSelectedCity = (state: RootState) => state.offers.selectedCity;
