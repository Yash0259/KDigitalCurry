import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for fetching courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  }
);

// Async thunk for adding course
export const addNewCourse = createAsyncThunk(
  'courses/addNew',
  async (courseData) => {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (courseData) => {
    const response = await axios.put(`${API_URL}/courses/${courseData._id}`, courseData);
    return response.data;
    }
);
// Async thunk for deleting course
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/courses/${courseId}`);
      return courseId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  courses: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add course
      .addCase(addNewCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })

      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((c) => c._id !== action.payload);
      })

      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course._id === action.payload._id);

        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      });
  }
});

export default courseSlice.reducer;
