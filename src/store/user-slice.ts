import { checkAuthAction as loginAction } from './api-actions';
import { AuthorizationStatus } from './../const/const';
import { UserData } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface State {
  userData: UserData | undefined;
  authorizationStatus: AuthorizationStatus;

}

const initialState: State = {
  userData: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state: State, action: PayloadAction<UserData | undefined>) => {
      state.userData = action.payload;
    },
    setAuthStatus: (state: State, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const { setUserData, setAuthStatus } = userSlice.actions;
export default userSlice.reducer;
