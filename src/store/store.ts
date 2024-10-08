import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { createSelector } from 'reselect';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// Export types for later use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectAllUsers = createSelector(
  (state: RootState) => state.users.allIds,
  (state: RootState) => state.users.byId,
  (allIds, byId) => allIds.map(id => byId[id])
);

export const selectUserById = (state: RootState, userId: number) => {
  const selectedUser = state.users.byId[userId];
  return selectedUser;
};
