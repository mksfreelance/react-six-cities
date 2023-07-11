export type CityLocation = {
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
}

export type OfferLocation = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type Offer = {
  bedrooms: number;
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
  description: string;
  goods: string[];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}
export type AuthData = {
  email: string;
  password: string;
}

export type UserData = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export type CommentData = {
  comment: string;
  id: string;
  rating: string;
}

export type cityNamesType = Record<string, {
  name: string;
  latitude: number;
  longitude: number;
  zoom: number;
}>

export type OfferStatusData = {
  status: number;
  id: number;
}
