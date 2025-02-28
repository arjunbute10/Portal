import { Card, Grid, Typography } from '@mui/material';
import { BarPlot, ChartContainer } from '@mui/x-charts';
import { HOURS, TOTAL_THIS_MOTNH, TOTAL_THIS_YEAR } from '../../util/string';
import AttendanceTable from './AttendanceTable';
import { useTimeSheetResponseList } from './TimeSheet.util';
import { generateCardSkeletons } from '../../util/commonUtility';

const getColorByValue = (value: any) => {
    if (value >= 0 && value <= 80) {
        return '#DB1F35';
    } else if (value > 80 && value <= 140) {
        return '#FFC107';
    } else if (value > 140) {
        return '#229A16';
    } else {
        return '#CCC';
    }
};

const getBarDataByValue = (value: any) => {
    if (value >= 0 && value <= 80) {
        return [1000, 1500, 2100, 1200, 1000, 500, 900];
    } else if (value > 80 && value <= 140) {
        return [1500, 2500, 2700, 1800, 2100, 2390, 3000];
    } else if (value > 140) {
        return [2500, 4000, 2980, 2480, 3190, 2300, 3000];
    } else {
        return [1000, 1500, 2100, 1200, 1000, 500, 900];
    }
};

const CustomBarChart = ({ value }: any) => {
    const color = getColorByValue(value);
    const uData = getBarDataByValue(value);
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G'
    ];

    return (
        <ChartContainer
            width={450}
            height={230}
            series={[{ data: uData, type: 'bar', color }]}
            xAxis={[{ scaleType: 'band', data: xLabels }]}
        >
            <BarPlot />
        </ChartContainer>
    );
};

const History = () => {
    const timeSheetResponseList = useTimeSheetResponseList();
    const timeSheetResponseData = timeSheetResponseList.query.isSuccess && timeSheetResponseList.query.data ? timeSheetResponseList.query.data : null;

    return (
        <>
            {timeSheetResponseData ?
                <Grid container spacing={3}>
                    <Grid item md={4} sm={12}>
                        <Card className="px-8 py-5">
                            <Typography variant='subtitle1'>{TOTAL_THIS_MOTNH}</Typography>
                            <Grid className='flex items-center justify-between chart-graph'>
                                <Grid item md={6.5}>
                                    <Typography variant='h1' sx={{ mt: '20px' }}>{timeSheetResponseData.presentMonthTotalHours} {HOURS}</Typography>
                                </Grid>
                                <Grid item md={5.5}>
                                    <CustomBarChart value={timeSheetResponseData.presentMonthTotalHours} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <Card className="px-8 py-5">
                            <Typography variant='subtitle1'>Total Extra Support - Current Year</Typography>
                            <Grid className='flex items-center justify-between chart-graph'>
                                <Grid item md={6.5}>
                                    <Typography variant='h1' sx={{ mt: '20px' }}>{timeSheetResponseData.presentYearTotalExtraHours} {HOURS}</Typography>
                                </Grid>
                                <Grid item md={5.5}>
                                    <CustomBarChart value={timeSheetResponseData.presentYearTotalExtraHours} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <Card className="px-8 py-5">
                            <Typography variant='subtitle1'>{TOTAL_THIS_YEAR}</Typography>
                            <Grid className='flex items-center justify-between chart-graph'>
                                <Grid item md={6.5}>
                                    <Typography variant='h1' sx={{ mt: '20px' }}>{timeSheetResponseData.presentYearTotalHours} {HOURS}</Typography>
                                </Grid>
                                <Grid item md={5.5}>
                                    <CustomBarChart value={timeSheetResponseData.presentYearTotalHours} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={3}>
                    {generateCardSkeletons(3)}
                </Grid>
            }
            <Grid container>
                <AttendanceTable
                    items={timeSheetResponseList.query.isSuccess ? timeSheetResponseList.query.data : null}
                    loaded={timeSheetResponseList.query.isSuccess}
                />
            </Grid>
        </>
    );
}

export default History;