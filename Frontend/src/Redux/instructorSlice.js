import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all instructors
export const fetchInstructors = createAsyncThunk(
  'instructors/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/instructors`);
    return response.data;
  }
);

// Add new instructor
export const addNewInstructor = createAsyncThunk(
  'instructors/addNew',
  async (instructorData) => {
    const response = await axios.post(`${API_URL}/instructors`, instructorData);
    return response.data;
  }
);

export const updateInstructor = createAsyncThunk(
  'instructors/updateInstructor',
  async (instructorData) => {
    const response = await axios.put(`${API_URL}/instructors/${instructorData._id}`, instructorData);
    return response.data;
  }
);


// Delete instructor
export const deleteInstructor = createAsyncThunk(
  'instructors/deleteInstructor',
  async (instructorId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/instructors/${instructorId}`);
      return instructorId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Delete failed');
    }
  }
);

const initialState = {
  instructors: [],
  status: 'idle',
  error: null
};

const instructorSlice = createSlice({
  name: 'instructors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.instructors = action.payload;
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addNewInstructor.fulfilled, (state, action) => {
        state.instructors.push(action.payload);
      })

      .addCase(deleteInstructor.fulfilled, (state, action) => {
        state.instructors = state.instructors.filter(
          (inst) => inst._id !== action.payload
        );
      })
      
      .addCase(updateInstructor.fulfilled, (state, action) => {
        const index = state.instructors.findIndex(instructor => instructor.id === action.payload.id);
        if (index !== -1) {
          state.instructors[index] = action.payload;
        }
      });
  }
});

export default instructorSlice.reducer;
