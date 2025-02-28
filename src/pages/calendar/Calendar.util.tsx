import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import moment from "moment";
import React from "react";
import { useBanner } from "../../controls/Banner";
import { useUser } from '../../util/auth/UserInfoProvider';
import { Config, Method, useApi } from "../../util/fetch/ApiProvider";
import { HOLIDAYS, LEAVES, WFH_SHORT } from "../../util/string";
import { AllLeaves, CalendarProps, HTTPResponse, HolidayMaster, HolidayRecord, LeaveDashbaord, NewLeave } from "./Calendar.model";

export const _getEmployeeLeaves = (empId: string): Config<LeaveDashbaord> => ({
    endpoint: `/getLeaveDashboard?empId=${empId}`,
    method: Method.GET
});

export const _getHolidayList = (city: string): Config<HolidayRecord> => ({
    endpoint: `/getHoliday?city=${city}`,
    method: Method.GET
});

 
export const _applyLeave = (data: NewLeave): Config<NewLeave> => ({
    endpoint: `/applyLeave`,
    method: Method.POST,
    body: data
});

export const _getAllLeave = (empId: string, limit: number = 100, offset: number = 0): Config<AllLeaves> => ({
    endpoint: `/getAllAppliedLeaves?empId=${empId}&pageNo=${offset}&pageSize=${limit}`,
    method: Method.GET,
});

export const _getAllWFH = (empId: string, limit: number = 100, offset: number = 0): Config<AllLeaves> => ({
    endpoint: `/getAllAppliedWFH?empId=${empId}&pageNo=${offset}&pageSize=${limit}`,
    method: Method.GET,
});

export const _deleteLeave = (leaveId: string | number): Config<HTTPResponse> => ({
    endpoint: `/deleteLeave?leaveDetailsId=${leaveId}`,
    method: Method.DELETE,
});

export const _getHolidayMaster = (): Config<HolidayMaster> => ({
    endpoint: `/getCityMaster`,
    method: Method.GET,
});



export const useHolidayMaster = () => {
    const { callApi } = useApi();
    const banner = useBanner();
    const queryKey = ['Holiday', 'HolidayMaster'];

    return {
        query: useQuery<HolidayMaster>(
            queryKey,
            () => {
                const config = _getHolidayMaster();
                return callApi(config);
            },
            {
                useErrorBoundary: (error: any) => error.response?.status >= 201,
                onError: (err: any) => {
                    banner.handleApiResponse(err);
                }
            }
        )
    };
};

export const useDeleteLeave = () => {
    const { callApi } = useApi();

    return async (leaveId: string | number) => {
        let config: Config<HTTPResponse> = _deleteLeave(leaveId);
        return callApi(config);
    };
};

export const useEmployeeLeaves = () => {
    const { callApi } = useApi();
    const banner = useBanner();
    const { userInfo } = useUser();
    const queryKey = ['Leaves', 'EmployeeLeaves', userInfo.employeeId];

    return {
        query: useQuery<LeaveDashbaord>(
            queryKey,
            () => {
                const config = _getEmployeeLeaves(userInfo.employeeId);
                return callApi(config);
            },
            {
                useErrorBoundary: (error: any) => error.response?.status >= 201,
                onError: (err: any) => {
                    banner.handleApiResponse(err);
                }
            }
        )
    };
};

export const useHolidayList = (city: string) => {
    const { callApi } = useApi();
    const banner = useBanner();
    const queryKey = ['Holiday', 'HolidayRecord'];

    return {
        query: useQuery<HolidayRecord>(
            queryKey,
            () => {
                const config = _getHolidayList(city);
                return callApi(config);
            },
            {
                useErrorBoundary: (error: any) => error.response?.status >= 201,
                onError: (err: any) => {
                    banner.handleApiResponse(err);
                }
            }
        )
    };
};


export const useAllLeaves = () => {
    const { callApi } = useApi();
    const banner = useBanner();
    const { userInfo } = useUser();

    const queryKey = ['Leaves', 'AllLeaves', userInfo.employeeId];

    return {
        query: useQuery<AllLeaves>(
            queryKey,
            () => {
                const config = _getAllLeave(userInfo.employeeId);
                return callApi(config);
            },
            {
                useErrorBoundary: (error: any) => error.response?.status >= 201,
                onError: (err: any) => {
                    banner.handleApiResponse(err);
                }
            }
        )
    };
};


export const useAllWFH = () => {
    const { callApi } = useApi();
    const banner = useBanner();
    const { userInfo } = useUser();

    const queryKey = ['Leaves', 'AllWFH', userInfo.employeeId];

    return {
        query: useQuery<AllLeaves>(
            queryKey,
            () => {
                const config = _getAllWFH(userInfo.employeeId);
                return callApi(config);
            },
            {
                useErrorBoundary: (error: any) => error.response?.status >= 201,
                onError: (err: any) => {
                    banner.handleApiResponse(err);
                }
            }
        )
    };
};

export const useLeave = () => {
    const { callApi } = useApi();

    return async (data: NewLeave) => {
        let config: Config<NewLeave> = _applyLeave(data);
        return callApi(config);
    };
};

export const renderCalendar = (events?: CalendarProps) => {
    const badgeIcon = (color: string) =>{
        const shapeStyles = { bgcolor: `${color}`, width: 20, height: 20, borderRadius: '50%', display: 'flex' };
        return (
            <Box component="span" sx={{ ...shapeStyles }} />
        );
    }

    return (
        <Grid item sm={12} md={4} className='pr-6 calendar-component'>
            <Grid className='date-container'><Typography>{moment().format('ll')}</Typography></Grid>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'prev,next'
                    // right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                // hiddenDays={[ 2, 4 ]}
                dayHeaderFormat={{ weekday: 'narrow' }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={events}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            // select={this.handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            // eventClick={this.handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
            <Grid className="calendar-footer space-x-8">
                <Grid className="flex items-center space-x-2">
                    {badgeIcon('primary.main')}
                    <Typography color={'text.primary'}>{HOLIDAYS}</Typography>
                </Grid>
                <Grid className="flex items-center space-x-2">
                    {badgeIcon('error.main')}
                    <Typography color={'text.primary'}>{LEAVES}</Typography>
                </Grid>
                <Grid className="flex items-center space-x-2">
                    {badgeIcon('info.main')}
                    <Typography color={'text.primary'}>{WFH_SHORT}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}



export const generateDashboardSkeletons = (amount: number) => {
    const skeletons: JSX.Element[] = [];
    let i: number = 0;

    while (i < amount) {
        const isEven = i % 2 === 0;
        const paddingRightClass = isEven ? 'pr-3' : 'pl-3'; // Assign class based on even or odd

        skeletons.push(
            <Grid item key={i} sm={12} md={6} className={`${paddingRightClass} pb-6`}>
                <Skeleton data-test-id="item-skeleton" key={i} className='item-skeleton item-skeleton-large' />
            </Grid>
        );
        i++;
    }
    return (
        <React.Fragment>
            {skeletons}
        </React.Fragment>
    );
};