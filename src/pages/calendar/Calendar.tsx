import { Container, Grid, Typography } from '@mui/material';
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PrimaryHeader from '../../layout/PrimaryHeader';
import IconElement from '../../util/commonUtility';
import CalendarDashboard from './components/CalendarDashboard';
import HolidayCalendar from './components/HolidayCalendar';
import Leaves from './components/Leaves/Leaves';
import clsx from 'clsx';
import { CALENDAR_TITLE, DASHBOARD, HOLIDAY_CALENDAR, LEAVES, WFH } from '../../util/string';
import Banner, { withBannerSupport } from '../../controls/Banner';
import { useAllLeaves, useAllWFH, useEmployeeLeaves } from './Calendar.util';
import withAuthentication from '../../util/auth/useAuthentication';

const Calendar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { route: 'dashboard', label: DASHBOARD, iconName: 'HiOutlineCalendarDays' },
        { route: 'leaves', label: LEAVES, iconName: 'HiOutlineRocketLaunch' },
        { route: 'wfh', label: WFH, iconName: 'HiOutlineHomeModern' },
        { route: 'holidays', label: HOLIDAY_CALENDAR, iconName: 'HiOutlineCalendar' },
    ];

    const currentTab = tabs.find(tab => location.pathname.includes(tab.route));

    const handleTabClick = (route: string) => {
        navigate(`/calendar/${route}`);
    }

    const employeeLeaves = useEmployeeLeaves();
    const allLeaves = useAllLeaves();
    const allWFH = useAllWFH();

    return (
        <Container maxWidth='xl'>
            <Grid container>
                <Grid container>
                    <PrimaryHeader label={CALENDAR_TITLE} />̉
                </Grid>
                <Grid container className='space-x-10 py-10'>
                    {tabs.map(tab => (
                        <Grid item key={tab.route}>
                            <Link to={`/calendar/${tab.route}`}>
                                <Typography
                                    variant='h5'
                                    color={tab.route === currentTab?.route ? 'primary' : 'secondary'}
                                    className={clsx(
                                        "flex items-center space-x-2 pb-2",
                                        { "border-b-2 border-primary": tab.route === currentTab?.route }
                                    )}
                                    onClick={() => handleTabClick(tab.route)}
                                >
                                    <IconElement iconName={tab.iconName.toString()} size={22} />
                                    <span className='font-semibold'>{tab.label}</span>
                                </Typography>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Banner />
            <Outlet />
            <Routes>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path='dashboard' element={
                    <CalendarDashboard
                        items={employeeLeaves.query.isSuccess ? employeeLeaves.query.data : null}
                        refreshing={employeeLeaves.query.isLoading}
                        loaded={employeeLeaves.query.isSuccess}
                        tableData={allLeaves.query.isSuccess && allLeaves.query.data.leaveResponseList ? allLeaves.query.data.leaveResponseList : []}
                        tableLoaded={allLeaves.query.isSuccess}
                    />
                } />
                <Route path='holidays' element={<HolidayCalendar />} />
                <Route path='leaves' element={
                    <Leaves
                        items={employeeLeaves.query.isSuccess ? employeeLeaves.query.data : null}
                        loaded={employeeLeaves.query.isSuccess}
                        tableData={allLeaves.query.isSuccess && allLeaves.query.data.leaveResponseList ? allLeaves.query.data.leaveResponseList : []}
                        tableLoaded={allLeaves.query.isSuccess}
                        refreshing={allLeaves.query.isLoading}
                        isWFH={false}
                    />
                } />
                <Route path='wfh' element={
                    <Leaves
                        items={employeeLeaves.query.isSuccess ? employeeLeaves.query.data : null}
                        loaded={employeeLeaves.query.isSuccess}
                        tableData={allWFH.query.isSuccess && allWFH.query.data.wfhResponseList ? allWFH.query.data.wfhResponseList : []}
                        tableLoaded={allWFH.query.isSuccess}
                        refreshing={allWFH.query.isLoading}
                        isWFH={true}
                    />
                } />
            </Routes>
        </Container>
    );
}

export default withAuthentication(withBannerSupport(Calendar));