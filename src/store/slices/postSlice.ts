import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts as fetchPostsFromApi } from '../../services/apiRequests';
import { Post } from '../../utils/interfaces/posts';
import { getErrorMessageByStatusCode } from '../../utils/getErrorMessageByStatusCode';
import { FETCH_POSTS } from '../../utils/constants';

interface PostState {
  byId: { [key: number]: Post };
  allIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

interface ApiError {
  status: number;
  message: string;
}

export const fetchPosts = createAsyncThunk<
  Post[],
  number, // userId as the argument
  { rejectValue: ApiError }
>(FETCH_POSTS, async (userId, { rejectWithValue }) => {
  try {
    const data = await fetchPostsFromApi(userId);
    return data;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response?.status || 500,
      message: getErrorMessageByStatusCode(error.response?.status),
    });
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePost(state, action) {
      const { id, data } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...data };
      }
    },
    deletePost(state, action) {
      const postId = action.payload;
      if (state.byId[postId]) {
        delete state.byId[postId];
        state.allIds = state.allIds.filter(id => id !== postId);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const posts = action.payload;

        state.byId = posts.reduce((acc, post) => {
          acc[post.id] = post;
          return acc;
        }, {} as PostState['byId']);

        state.allIds = posts.map(post => post.id);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        const errorInfo = action.payload;
        state.loading = false;
        state.error = errorInfo?.message || 'Something went wrong';
      });
  },
});

export const { updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
