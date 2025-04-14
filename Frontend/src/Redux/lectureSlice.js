import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all lectures with optional filters (e.g., by instructor or date range)
export const fetchLectures = createAsyncThunk(
  'lectures/fetchLectures',
  async () => {
    const response = await axios.get(`${API_URL}/lectures`);
    return response.data;
  }
);

// Add a new lecture with conflict checking
export const addLecture = createAsyncThunk(
  'lectures/addLecture',
  async (lectureData) => {
    const response = await axios.post(`${API_URL}/lectures`, lectureData);
    return response.data;
  }
);

// Delete a lecture
export const deleteLecture = createAsyncThunk(
  'lectures/deleteLecture',
  async (lectureId) => {
    await axios.delete(`${API_URL}/lectures/${lectureId}`);
    return lectureId;
  }
);

const initialState = {
  lectures: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const lectureSlice = createSlice({
  name: 'lectures',
  initialState: {
    instructors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch lectures
      .addCase(fetchLectures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLectures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lectures = action.payload;
      })
      .addCase(fetchLectures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add a new lecture
      .addCase(addLecture.fulfilled, (state, action) => {
        state.lectures.push(action.payload);
      })

      // Delete a lecture
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.lectures = state.lectures.filter((lecture) => lecture._id !== action.payload);
      });
  }
});

export default lectureSlice.reducer;
