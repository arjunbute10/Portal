
import { Card, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DialogBox } from '../../../controls/DialogBox';
import PrimaryButton from '../../../controls/FormControls/PrimaryButton';
import { APPLY_LEAVE, APPLY_WFH, APPROVED, AVAILABLE, EARNED_LEAVE, LEAVES, LEAVES_STATUS, LEAVES_TAKEN, PENDING, SICK_LEAVE, TOTAL_AVAILABLE, TOTAL_LEAVES, TOTAL_WFH, UPCOMING_LEAVES, WFH, WFH_SHORT, WFH_TAKEN } from '../../../util/string';
import { LeaveDashbaord, LeaveRecord } from '../Calendar.model';
import { generateDashboardSkeletons, renderCalendar } from '../Calendar.util';
import ApplyLeave from './Leaves/ApplyLeave';
import { getLeaveTypeName, toCapitalize } from '../../../util/commonUtility';
import moment from 'moment';

export interface EmployeeLeavesProps {
    loaded: boolean;
    items: LeaveDashbaord | null;
    refreshing: boolean;
    tableData: LeaveRecord[];
    tableLoaded: boolean;
    isWFH?: boolean;
}

const CalendarDashboard = ({ items, loaded, tableData }: EmployeeLeavesProps) => {
    const [events, setEvents] = useState<any>();
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (tableData.length > 0) {
            const data = tableData.map((leave: LeaveRecord) => ({
                title: leave.reason,
                start: leave.fromDate,
                end: leave.toDate,
                status: leave.status
            }));
            setEvents(data);
        }
    }, [tableData]);

    const renderedLeaveItems = () => {

        return (
            <>
                <Grid item sm={12} md={6} className='pr-3 pb-6'>
                    <Card className='p-8'>
                        <Typography variant="subtitle1">{LEAVES}</Typography>
                        <Typography variant="h1">{items?.leaveDetailCount.totalAvailable} {AVAILABLE}</Typography>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{TOTAL_LEAVES}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.leaveDetailCount.totalLeaves}</Typography>
                        </Grid>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{LEAVES_TAKEN}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.leaveDetailCount.leaveTaken}</Typography>
                        </Grid>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{TOTAL_AVAILABLE}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.leaveDetailCount.totalAvailable}</Typography>
                        </Grid>
                        <PrimaryButton label={APPLY_LEAVE} variant="outlined" sx={{ mt: 3 }} onClick={() => setOpen(true)} />
                    </Card>
                </Grid>
                <Grid item sm={12} md={6} className='pl-3 pb-6'>
                    <Card className='p-8'>
                        <Typography variant="subtitle1">{WFH}</Typography>
                        <Typography variant="h1">{items?.wfhDetailCount.totalAvailable} {AVAILABLE}</Typography>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{TOTAL_WFH}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.wfhDetailCount.totalLeaves}</Typography>
                        </Grid>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{WFH_TAKEN}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.wfhDetailCount.leaveTaken}</Typography>
                        </Grid>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{TOTAL_AVAILABLE}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.wfhDetailCount.totalAvailable}</Typography>
                        </Grid>
                        <PrimaryButton label={APPLY_WFH} variant="outlined" sx={{ mt: 3 }} onClick={() => setOpen(true)} />
                    </Card>
                </Grid>
                <Grid item sm={12} md={6} className='pr-3 pb-6'>
                    <Card className='p-8'>
                        <Typography variant="subtitle1">{LEAVES_STATUS}</Typography>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{toCapitalize(APPROVED)}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.leaveApprovalStatus.approved}</Typography>
                        </Grid>
                        <Grid container className='justify-between mt-3'>
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>{toCapitalize(PENDING)}:</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px' }}>{items?.leaveApprovalStatus.pending}</Typography>
                        </Grid>
                    </Card>
                </Grid>
                {items && items?.upcomingLeaves.length > 0 &&
                    <Grid item sm={12} md={6} className='pl-3 pb-6'>
                        <Card className='p-8'>
                            <Typography variant="subtitle1">{UPCOMING_LEAVES}</Typography>
                            {items?.upcomingLeaves.map((leave) =>
                                <Grid container className='justify-between mt-3'>
                                    <Typography variant="body1" sx={{ fontSize: '16px' }}>{getLeaveTypeName(leave.leaveType)}:</Typography>
                                    <Typography variant="h6" sx={{ fontSize: '16px' }}>{moment(leave.leaveDate).format('DD MMM YYYY')}</Typography>
                                </Grid>
                            )}
                        </Card>
                    </Grid>
                }
                <DialogBox
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                    title={APPLY_LEAVE + ' / ' + WFH_SHORT}
                    content={<ApplyLeave onClose={() => setOpen(false)} />}
                />
            </>
        );
    }

    return (
        <Grid container className='mt-1'>
            {renderCalendar(events)}
            <Grid container item sm={12} md={8}>
                {items && loaded &&
                    renderedLeaveItems()
                }
                {!loaded &&
                    generateDashboardSkeletons(4)
                }
            </Grid>
        </Grid>
    )
};

export default CalendarDashboard;