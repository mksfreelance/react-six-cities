export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const BACKEND_URL = 'https://11.react.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const EMAIL_REG_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REG_EXP = /^(?=.*\d)(?=.*[A-Za-zА-Яа-яЁё])([^\s]){2,}$/;
export const MIN_LENGTH_OF_PASSWORD = 1;
export const TIMEOUT_SHOW_ERROR = 3000;
export const MIN_LENGTH_OF_REVIEW = 50;
export const MAX_LENGTH_OF_REVIEW = 300;
export const MAX_COUNT_OF_REVIEWS = 10;
export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'PriceLowToHigh',
  PriceHighToLow = 'PriceHighToLow',
  RatingHighToLow = 'RatingHighToLow'
}
export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer/:id',
  Favorites = '/favorites',
  NotFound = '*'
}

export enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CitiesList {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export type cityNamesType = Record<string, {
  name: string;
  latitude: number;
  longitude: number;
  zoom: number;
}>

export const cityNames: cityNamesType = {
  paris: {
    name: 'paris',
    latitude: 48.861694,
    longitude: 2.351557,
    zoom: 12
  },
  cologne: {
    name: 'cologne',
    latitude: 50.930779,
    longitude: 6.938399,
    zoom: 12
  },
  brussels: {
    name: 'brussels',
    latitude: 50.854283,
    longitude: 4.352131,
    zoom: 12
  },
  amsterdam: {
    name: 'amsterdam',
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 12
  },
  hamburg: {
    name: 'hamburg',
    latitude: 53.550688,
    longitude: 9.992895,
    zoom: 12
  },
  dusseldorf: {
    name: 'dusseldorf',
    latitude: 51.238475,
    longitude: 6.790159,
    zoom: 12
  },
};

export type CityName = keyof typeof cityNames;
export type OfferId = number;
