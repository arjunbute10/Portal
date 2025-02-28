import { Container, Grid, Typography } from '@mui/material';
import PrimaryHeader from '../../layout/PrimaryHeader';
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD, HISTORY, TIME_SHEET } from '../../util/string';
import clsx from 'clsx';
import IconElement from '../../util/commonUtility';
import History from './History';
import TimeTracker from './TimeTracker';
import TimesheetDashboard from './TimesheetDashboard';
import withAuthentication from '../../util/auth/useAuthentication';
import Banner, { withBannerSupport } from '../../controls/Banner';

const TimeSheet = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { route: 'dashboard', label: DASHBOARD, iconName: 'HiOutlineCalendarDays' },
        { route: 'timetracker', label: TIME_SHEET, iconName: 'HiOutlineCalendar' },
        { route: 'history', label: HISTORY, iconName: 'HiOutlineInboxStack' },
    ];

    const currentTab = tabs.find(tab => location.pathname.includes(tab.route));

    const handleTabClick = (route: string) => {
        navigate(`/timesheet/${route}`);
    }

    return (
        <Container maxWidth='xl'>
            <Grid container >
                <Grid container>
                    <PrimaryHeader label={TIME_SHEET} />
                </Grid>
                <Grid container className='space-x-10 py-10'>
                    {tabs.map(tab => (
                        <Grid item key={tab.route}>
                            <Link to={`/timesheet/${tab.route}`}>
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
                <Route path='dashboard' element={<TimesheetDashboard/>} />
                <Route path='timetracker' element={<TimeTracker/>} />
                <Route path='history' element={<History/>} />
            </Routes>
        </Container>
    );
}

export default withAuthentication(withBannerSupport(TimeSheet));

