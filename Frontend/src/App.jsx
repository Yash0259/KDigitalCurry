import { Routes, Route , Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminLayout from './Pages/AdminLayout';
import InstructorLayout from './Pages/InstructorLayout';
import InstructorComp from "./components/Admin/InstuctorComp";
import Courses from "./components/Admin/Courses";
import Lectures from "./components/Admin/Lectures";
import "./App.css"

import InstructroLec from "./components/Instructor/InstructorLec";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<InstructorComp />} />
        <Route path="instructors" element={<InstructorComp />} />
        <Route path="courses" element={<Courses />} />
        <Route path="lectures" element={<Lectures />} />
      </Route>

      <Route path="/instructor/*" element={<InstructorLayout />}>
        <Route index element={<InstructroLec />} />
        <Route path="lectures" element={<InstructroLec />} />
      </Route>
    </Routes>
  );
}

export default App;