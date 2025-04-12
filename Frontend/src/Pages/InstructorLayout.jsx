import Layout from "../components/Layout/Layout";
import {Routes , Route} from "react-router-dom";
import InstructorLec from "../components/Instructor/InstructorLec";


const InstructorLayout = () => {
  return (
    <Layout role="instructor">
      <Routes>
        <Route index element={<InstructorLec/>} />
        <Route path="lectures" element={<InstructorLec />} />
      </Routes>
    </Layout>
  );
}
export default InstructorLayout;
