import Layout from "../components/Layout/Layout";
import {Routes , Route} from "react-router-dom";
import InstructorComp from "../components/Admin/InstructorComp";
import Courses from "../components/Admin/Courses"
import Lectures from "../components/Admin/Lectures"

const AdminLayout = () => {
    return (
        <Layout role="admin">
          <Routes>
            <Route index element={<InstructorComp />} />
            <Route path="instructors" element={<InstructorComp />} />
            <Route path="courses" element={<Courses />} />
            <Route path="lectures" element={<Lectures />} />
          </Routes>
        </Layout>
      );
    }

export default AdminLayout;
