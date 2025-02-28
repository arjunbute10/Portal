import { CssBaseline, styled } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Sidebar from './layout/Sidebar'
import Calendar from './pages/calendar/Calendar'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/auth/resetPassword/ForgotPassword'
import Learning from './pages/learning/Learning'
import Login from './pages/auth/login/Login'
import TimeSheet from './pages/timeSheet/TimeSheet'
import EmployeeContainer from './pages/employee/EmployeeContainer'
import AddEmployee from './pages/employee/addEmployee/SaveEmployee'
import EmployeeProfile from './pages/userProfile/EmployeeProfile'

function App() {
  const location = useLocation();
  const shouldShowSidebar = () => {
    const { pathname } = location;
    return !['/login', '/reset-password'].includes(pathname);
  };

  const StyledBox = styled(Box)(() => ({
    backgroundColor: shouldShowSidebar() ? '#f1f1f1' : '#fff',
    flexGrow: 1,
  }));

  useEffect(() => {
    if (!shouldShowSidebar()) {
      document.body.classList.remove('full-screen');
    } else {
      document.body.classList.add('full-screen');
    }
  }, [location]);

  return (
    <Box className="flex">
      <CssBaseline />
      {shouldShowSidebar() && <Sidebar />}
      <StyledBox component={"main"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/" element={<Dashboard />} />
          <Route path='/timesheet/*' element={<TimeSheet />} />
          <Route path='/learning/*' element={<Learning />} />
          <Route path='/employees' element={<EmployeeContainer />} />
          <Route path='/calendar/*' element={<Calendar />} />
          <Route path='/add-employee' element={<AddEmployee />} />
          <Route path='/employee-profile/:eid' element={<EmployeeProfile />} />
          <Route path='/employee-profile/' element={<EmployeeProfile />} />
        </Routes>
      </StyledBox>
    </Box>

  )
}

export default App
