import EduDashDrawer from '../components/Layout/EduDashDrawer';
import { Outlet } from 'react-router-dom';


const InstructorLayout = () => {
  return (
    <EduDashDrawer role="instructor">
        <Outlet />
    </EduDashDrawer>
);
};
export default InstructorLayout;
