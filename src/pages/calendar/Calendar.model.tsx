
// export interface AppliedLeaves {
//     leaveResponseList: LeaveDashbaord[]
// }

//Dashboard Component
export interface LeaveDashbaord {
    leaveResponseList: [],
    wfhResponseList: [],
    leaveDetailCount: DetailCount,
    wfhDetailCount: DetailCount
    upcomingLeaves: UpcomingLeaves[],
    leaveApprovalStatus: LeaveStatus
}

export interface DetailCount {
    totalLeaves: number,
    leaveTaken: number,
    totalAvailable: number
}

export interface LeaveStatus {
    approved: number,
    pending: number
}

export interface UpcomingLeaves {
    leaveType: string,
    leaveDate: string
}

// Leaves Component
export interface NewLeave {
    from_date: string,
    to_date: string,
    leave_type: string,
    reason: string,
    employee_id: string,
    isHalfDay: boolean
}

export interface AllLeaves {
    leaveResponseList: LeaveRecord[],
    wfhResponseList: LeaveRecord[]
}

export interface LeaveRecord {
    id: number,
    leaveId: number,
    appliedOn: string,
    fromDate: string,
    toDate: string,
    leaveType: string,
    reason: string,
    isHalfDay:boolean
    managerName: string,
    status: string
}

export interface HTTPResponse {
    status: number,
    message: string,
    errorCode: number
}

//Holiday Component
export interface HolidayRecord {
    holidayList: HolidayList[];
}

export interface HolidayList {
    holiday_value: string,
    holiday_date: string,
}

export interface HolidayMaster {
    cities: HolidayMasterData[];
}

export interface HolidayMasterData {
    cityId: number,
    cityName: string,
}

// Render Calendar
export interface CalendarProps {
    events: any;
}