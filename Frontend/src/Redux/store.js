import { configureStore } from '@reduxjs/toolkit';
import instructorReducer from './instructorSlice';
import coursesReducer from './courseSlice';
import lectureReducer from './lectureSlice';

const store = configureStore({
    reducer:{
        instructor: instructorReducer,
        courses:coursesReducer,
        lectures:lectureReducer,
    }
});

export default store;  //export the store