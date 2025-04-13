import EduDashDrawer from '../components/Layout/EduDashDrawer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <EduDashDrawer role="admin">
            <Outlet />
        </EduDashDrawer>
    );
};

export default AdminLayout;