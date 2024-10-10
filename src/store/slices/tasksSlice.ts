import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../utils/interfaces/tasks';
import { fetchTasks as fetchTasksFromApi } from '../../services/apiRequests';
import { getErrorMessageByStatusCode } from '../../utils/getErrorMessageByStatusCode';
import { FETCH_TASKS } from '../../utils/constants';
import { RegectedApiError } from '../../utils/interfaces/errors';

interface TaskState {
  byId: { [key: number]: Task };
  allIds: number[];
  filteredIds: number[];
  filters: {
    // @TODO: ENUM - for these values
    status: 'completed' | 'notCompleted' | 'all';
    title: string;
    userId: number | null;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  byId: {},
  allIds: [],
  filteredIds: [],
  filters: {
    // @TODO: ENUM
    status: 'all',
    title: '',
    userId: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  },
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: RegectedApiError }
>(FETCH_TASKS, async (_, { rejectWithValue }) => {
  try {
    const data = await fetchTasksFromApi();
    return data;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response?.status || 500,
      message: getErrorMessageByStatusCode(error.response?.status),
    });
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTaskStatus(
      state,
      action: PayloadAction<{ id: number; status: boolean }>,
    ) {
      const { id, status } = action.payload;
      if (state.byId[id]) {
        state.byId[id].completed = status;
      }
    },
    updateFilters(state, action: PayloadAction<Partial<TaskState['filters']>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredIds = state.allIds.filter(id => {
        const task = state.byId[id];
        return (
          // @TODO: ENUMS
          (state.filters.status === 'all' ||
            (state.filters.status === 'completed'
              ? task.completed
              : !task.completed)) &&
          task.title.includes(state.filters.title) &&
          (state.filters.userId === null ||
            task.userId === state.filters.userId)
        );
      });
    },
    resetFilters(state) {
      // @TODO: ENUM
      state.filters = { status: 'all', title: '', userId: null };
      state.filteredIds = [...state.allIds];
    },
    updatePagination(state, action: PayloadAction<number>) {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        const tasks = action.payload;

        state.byId = tasks.reduce((acc, task) => {
          acc[task.id] = task;
          return acc;
        }, {} as TaskState['byId']);

        state.allIds = tasks.map(task => task.id);
        state.pagination.totalItems = tasks.length;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      });
  },
});

export const {
  updateTaskStatus,
  updateFilters,
  resetFilters,
  updatePagination,
} = taskSlice.actions;

export default taskSlice.reducer;
