import { Container, Grid } from '@mui/material';
import { withBannerSupport } from '../../controls/Banner';
import PrimaryHeader from '../../layout/PrimaryHeader';
import { EMPLOYEE_DIRECTORY } from '../../util/string';
import { useAllEmployees } from './Employee.util';
import EmployeeDirectory from './EmployeeDirectory';
import withAuthentication from '../../util/auth/useAuthentication';

const EmployeeContainer = () => {

    const allEmplopyees = useAllEmployees();

    return (
        <Container maxWidth='xl'>
            <Grid container>
                <Grid container >
                    <PrimaryHeader label={EMPLOYEE_DIRECTORY} />
                </Grid>
                <Grid container>
                    <EmployeeDirectory
                        refreshing={allEmplopyees.query.isLoading}
                        loaded={allEmplopyees.query.isSuccess}
                        items={allEmplopyees.query.isSuccess ? allEmplopyees.query.data?.employees : []}
                        totalRecordCount={allEmplopyees.query.isSuccess ? allEmplopyees.query.data.employees?.length : 0}
                    />
                </Grid>
            </Grid >
        </Container >
    );
}

export default withAuthentication(withBannerSupport(EmployeeContainer));