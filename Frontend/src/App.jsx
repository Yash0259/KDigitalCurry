import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminLayout from './Pages/AdminLayout';
import InstructorLayout from './Pages/InstructorLayout';
import InstructorComp from "./components/Admin/InstuctorComp";
import Courses from "./components/Admin/Courses";
import Lectures from "./components/Admin/Lectures";

import InstructroLec from "./components/Instructor/InstructorLec";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<InstructorComp />} />
        <Route path="instructors" element={<InstructorComp />} />
        <Route path="courses" element={<Courses />} />
        <Route path="lectures" element={<Lectures />} />
      </Route>

      <Route path="/instructor/*" element={<InstructorLayout />}>
        <Route index element={<InstructroLec/>}/>
        <Route path="lectures" element={<InstructroLec/>}/>
      </Route>
    </Routes>
  );
}

export default App;