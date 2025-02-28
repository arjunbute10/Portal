import { DateSelectArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { DialogBox } from '../../controls/DialogBox';
import { toCapitalize } from '../../util/commonUtility';
import { APPLY_LEAVE, APPROVED, DATE_FORMAT, PENDING, WFH_SHORT } from '../../util/string';
import { useAllLeaves, useHolidayList } from '../calendar/Calendar.util';
import ApplyLeave from '../calendar/components/Leaves/ApplyLeave';
import { useTimeSheetResponseList } from './TimeSheet.util';
import moment from 'moment';

const TimesheetDashboard = () => {
    const [events, setEvents] = useState<any>();
    const [isOpen, setOpen] = useState(false);
    const [dateSelect, setDateSelect] = useState<DateSelectArg>();

    const holidayList = useHolidayList('Pune');
    const holidayData = holidayList.query.isSuccess && holidayList.query.data.holidayList ? holidayList.query.data?.holidayList : [];

    const appliedLeaves = useAllLeaves();
    const appliedLeavesData = appliedLeaves.query.isSuccess && appliedLeaves.query.data.leaveResponseList ? appliedLeaves.query.data.leaveResponseList : [];

    const timesheetTracker = useTimeSheetResponseList();
    const timesheetData = timesheetTracker.query.isSuccess && timesheetTracker.query.data.timeSheetResponseList ? timesheetTracker.query.data.timeSheetResponseList : [];


    const addEvent = (selectInfo: DateSelectArg) => {
        setOpen(true);
        setDateSelect(selectInfo);
        console.log(selectInfo);
    }

    useEffect(() => {
        const holidayEvents = holidayData.map((obj) => ({
            title: 'Holiday - ' + obj.holiday_value,
            start: obj.holiday_date,
            allDay: true,
            editable: false,
            backgroundColor: '#F479203D',
            borderColor: '#F47920',
            textColor: '#F47920',
        }));

        const leaveEvents = appliedLeavesData.map((leave) => ({
            title: toCapitalize(leave.status) + ' - ' + leave.reason,
            start: leave.fromDate,
            end: leave.toDate,
            status: leave.status,
            editable: leave.status === PENDING ? true : false,
            backgroundColor: leave.status === PENDING ? '#FFC1073D' : (leave.status === APPROVED ? '#54D62C29' : '#DB1F353D'),
            borderColor: leave.status === PENDING ? '#B78103' : (leave.status === APPROVED ? '#229A16' : '#DB1F35'),
            textColor: leave.status === PENDING ? '#B78103' : (leave.status === APPROVED ? '#229A16' : '#DB1F35'),
        }));

        const timesheetEvents: any[] = []

        timesheetData.forEach((timeSheet) => {
            timeSheet.projects.forEach((project) => {
                const title = project.projectHourDesc.map((hour) => {
                    return hour.workdDescription
                });
                timesheetEvents.push({
                    id: timeSheet.timeSheet.timesheetId,
                    date: moment(timeSheet.timeSheet.date),
                    title: project.projectName + ' - ' + title,
                    manager_approver: project.managerName,
                    backgroundColor: project.status === PENDING ? '#FFC1073D' : (project.status === APPROVED ? '#54D62C29' : '#DB1F353D'),
                    borderColor: project.status === PENDING ? '#B78103' : (project.status === APPROVED ? '#229A16' : '#DB1F35'),
                    textColor: project.status === PENDING ? '#B78103' : (project.status === APPROVED ? '#229A16' : '#DB1F35'),
                });
            });
        });


        // const timesheetEvents = timesheetData.map((time) => ({
        //     title: time.projects,
        //     start: leave.fromDate,
        //     end: leave.toDate,
        //     status: leave.status,
        //     editable: leave.status === PENDING ? true : false,
        //     backgroundColor: leave.status === PENDING ? '#FFC1073D' : (leave.status === APPROVED ? '#54D62C29' : '#DB1F353D'),
        //     borderColor: leave.status === PENDING ? '#B78103' : (leave.status === APPROVED ? '#229A16' : '#DB1F35'),
        //     textColor: leave.status === PENDING ? '#B78103' : (leave.status === APPROVED ? '#229A16' : '#DB1F35'),
        // }));


        setEvents([...holidayEvents, ...leaveEvents, ...timesheetEvents]);
    }, [holidayData, appliedLeavesData, timesheetData]);

    return (
        <>
            <Grid className='timesheet-dashboard mt-1'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        right: 'today',
                        center: 'prev title next',
                        left: 'dayGridMonth,timeGridWeek'
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    height={850}
                    events={events}
                    // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={addEvent}
                // eventContent={renderEventContent} // custom render function
                // eventClick={() => setOpen(true)} 
                />
            </Grid>

            <DialogBox
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                title={APPLY_LEAVE + ' / ' + WFH_SHORT}
                content={<ApplyLeave onClose={() => setOpen(false)} dateSelect={dateSelect} />}
            />
        </>
    )
}

export default TimesheetDashboard;