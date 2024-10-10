import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import { createSelector } from 'reselect';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
  },
});

// Export types for later use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ---------- Selectors -----------------
// Users
export const selectAllUsers = createSelector(
  (state: RootState) => state.users.allIds,
  (state: RootState) => state.users.byId,
  (allIds, byId) => allIds.map(id => byId[id]),
);

export const selectUserById = (state: RootState, userId: number) => {
  const selectedUser = state.users.byId[userId];
  return selectedUser;
};

// Posts
export const selectAllPosts = createSelector(
  (state: RootState) => state.posts.allIds,
  (state: RootState) => state.posts.byId,
  (allIds, byId) => allIds.map(id => byId[id]),
);

export const selectHasPostsForUserId = (state: RootState, userId?: number) => {
  return Object.entries(state.posts.byId).some(
    ([, post]) => post.userId === userId,
  );
};

// Tasks
