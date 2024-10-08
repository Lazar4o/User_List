import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers as fetchUsersFromApi } from '../../services/apiRequests';
import { User } from '../../utils/interfaces/users';
import { getErrorMessageByStatusCode } from '../../utils/getErrorMessageByStatusCode';
import { FETCH_USERS } from '../../utils/constants';

interface UserState {
  byId: { [key: number]: User };
  allIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

interface ApiError {
  status: number;
  message: string;
}

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ApiError }
>(FETCH_USERS, async (_, { rejectWithValue }) => {
  try {
    const data = await fetchUsersFromApi();
    return data;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response?.status || 500,
      message: getErrorMessageByStatusCode(error.response?.status),
    });
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser(state, action) {
      const { id, data } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...data };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const users = action.payload;

        state.byId = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as UserState['byId']);

        state.allIds = users.map(user => user.id);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        const errorInfo = action.payload;
        state.loading = false;
        state.error = errorInfo?.message || 'Something went wrong';
      });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
