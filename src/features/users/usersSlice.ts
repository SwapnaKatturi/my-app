import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserRow {
  id: number;
  name: string;
  email: string;
  company: string;
  city: string;
}

interface UsersState {
  rows: UserRow[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchUsers = createAsyncThunk<UserRow[]>('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  const data = await response.json();

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    company: item.company?.name ?? '',
    city: item.address?.city ?? '',
  }));
});

export const createUser = createAsyncThunk<UserRow, Omit<UserRow, 'id'>>(
  'users/createUser',
  async (userData) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id ?? Date.now(),
      name: data.name ?? userData.name,
      email: data.email ?? userData.email,
      company: data.company ?? userData.company,
      city: data.city ?? userData.city,
    };
  },
);

const initialState: UsersState = {
  rows: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rows = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load data';
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rows.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to save user';
      });
  },
});

export default usersSlice.reducer;
