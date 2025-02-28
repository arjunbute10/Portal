import { Container, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Banner, { withBannerSupport } from '../../controls/Banner';
import PrimaryHeader from '../../layout/PrimaryHeader';
import IconElement from '../../util/commonUtility';
import { LEARNING, MANDATORY_COURSES, QUATERLY_TRAININGS, UPCOMING_SEMINARS } from '../../util/string';
import MandatoryCourses from './MandatoryCourses';
import QuaterlyTrainings from './QuaterlyTrainings';
import UpcomingSeminars from './UpcomingSeminars';
import withAuthentication from '../../util/auth/useAuthentication';

const Learning = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { route: 'upcoming-seminars', label: UPCOMING_SEMINARS, iconName: 'HiOutlineUserGroup' },
        { route: 'quatery-trainings', label: QUATERLY_TRAININGS, iconName: 'HiOutlineTrophy' },
        { route: 'mandatory-courses', label: MANDATORY_COURSES, iconName: 'HiOutlineBookOpen' },
    ];

    const currentTab = tabs.find(tab => location.pathname.includes(tab.route));

    const handleTabClick = (route: string) => {
        navigate(`/learning/${route}`);
    }
    return (
        <Container maxWidth='xl'>
            <Grid>
                <Grid container>
                    <PrimaryHeader label={LEARNING}/>
                </Grid>
                <Grid container className='space-x-10 pt-10 pb-1'>
                    {tabs.map(tab => (
                        <Grid item key={tab.route}>
                            <Link to={`/learning/${tab.route}`}>
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
                <Route index element={<Navigate to="upcomingSeminars" />} />
                <Route path='upcoming-seminars' element={<UpcomingSeminars />} />
                <Route path='quatery-trainings' element={<QuaterlyTrainings />} />
                <Route path='mandatory-courses' element={<MandatoryCourses />} />
            </Routes>
        </Container>
    );
}

export default withAuthentication(withBannerSupport(Learning));