import { Routes ,Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminLayout from './Pages/AdminLayout';
import InstructorLayout from './Pages/InstructorLayout';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/admin" element={<AdminLayout/>}/>
      <Route path="/instructor" element={<InstructorLayout/>}/>
    </Routes>
  );
}

export default App;
