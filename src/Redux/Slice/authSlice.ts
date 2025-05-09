import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  fullname: string;
  email: string;
  password: string;
  role: string;
  loading: boolean;
}

const initialState: AuthState = {
  fullname: '',
  email: '',
  password: '',
  role: 'user',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFullname: (state, action: PayloadAction<string>) => {
      state.fullname = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFullname,
  setEmail,
  setPassword,
  setRole,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
