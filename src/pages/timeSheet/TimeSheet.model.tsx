
export interface TimeSheetResponseRecord {
    timeSheetResponseList: TimeSheetResponseList[];
    presentWeekTotalHours: number;
    presentMonthTotalHours: number;
    presentYearTotalHours: number;
    presentYearTotalExtraHours: number;
}

export interface TimeSheetResponseList {
    timeSheet: TimeSheet;
    projects: Project[];
    presentDayTotalHours: number;
}

export interface TimeSheet {
    timesheetId: number;
    date: string;
}

export interface Project {
    projectName: string;
    projectHourDesc: ProjectHourDescription[];
    managerName: string;
    status: string;
}

export interface ProjectHourDescription {
    hoursWorked: number;
    workdDescription: string;
}

export interface TimesheetRecord { 
    id: number;
    date: string;
    project: string;
    hours: string;
    status: string;
    manager_approver: string;

}



