import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import PrimaryHeader from '../layout/PrimaryHeader';
import { useUser } from '../util/auth/UserInfoProvider';
import withAuthentication from '../util/auth/useAuthentication';
import { UserInfo } from './auth/login/Login.model';
import { renderCalendar } from './calendar/Calendar.util';

const Dashboard = () => {
    const [userData, setUserData] = useState<UserInfo | null>(null);
    const { userInfo } = useUser();
    useEffect(() => {
        setUserData(userInfo);
    }, [userInfo]);
    return (
        <Container maxWidth='xl'>
            <Grid container>
                <Grid container>
                    <PrimaryHeader label={`Welcome ${userData?.employeeName}`} />
                </Grid>
            </Grid>
            <Grid container className='py-8'>
                {renderCalendar()}
            </Grid>
        </Container>
    );
}

export default withAuthentication(Dashboard);