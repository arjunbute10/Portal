import { Grid, MenuItem, Select, Skeleton, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { toCapitalize } from "../../util/commonUtility";
import { ATTENDANCE_HISTORY, DATE_FORMAT, HOURS, LEAVES_BALANCE, LEAVES_TAKEN, LEAVE_HISTORY, NO_DATA, TOTAL_LEAVES, TOTAL_THIS_WEEK, TOTAL_WFH, WFH_HISTORY, WFH_TAKEN } from "../../util/string";
import { TimeSheetResponseRecord, TimesheetRecord } from "./TimeSheet.model";
import EmptyState from "../../controls/EmptyState";

export interface AttendanceTableProps {
    loaded: boolean;
    items: TimeSheetResponseRecord | null;
}

const initialRows: TimesheetRecord[] = [];

const months = moment.months();

// function EditToolbar({ selectedMonth, handleMonthChange }: any) {

//     return (
//         <Grid container className='bg-tableHeader py-3 px-8 rounded-t-[12px] justify-between items-center'>
//             <Grid item>
//                 <Typography variant="h6">
//                     {ATTENDANCE_HISTORY}
//                 </Typography>
//             </Grid>
//             <Grid item className="flex space-x-10 items-center">
//                 <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{TOTAL_THIS_WEEK}: { }</Typography>
//                 <Select
//                     sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontSize: 16 }}
//                     value={selectedMonth}
//                     onChange={handleMonthChange}
//                     className="month-dropdown"
//                 >
//                     {months.map((month, index) => (
//                         <MenuItem key={month} value={index}>
//                             {month}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </Grid>
//         </Grid>
//     );
// }

const AttendanceTable = ({ loaded, items }: AttendanceTableProps) => {
    const [rows, setRows] = useState<TimesheetRecord[]>(initialRows);
    const [filteredRows, setFilteredRows] = useState<TimesheetRecord[]>(initialRows);
    const [selectedMonth, setSelectedMonth] = useState(moment().month());

    const handleMonthChange = (event: any) => {
        setSelectedMonth(event.target.value);

    };

    const EditToolbar = (disableSkeleton: boolean = true, selectedMonth?: any, handleMonthChange?: any) => {
        return (
            <Grid container className='bg-tableHeader py-3 px-8 rounded-t-[12px] justify-between items-center'>
                <Grid item>
                    <Typography variant="h6">
                        {ATTENDANCE_HISTORY}
                    </Typography>
                </Grid>
                <Grid item className="flex items-center space-x-5">
                    {disableSkeleton && loaded ?
                        <>
                            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15, marginTop: '2px' }}>{TOTAL_THIS_WEEK + ': ' + items?.presentWeekTotalHours}</Typography>
                            {items && items?.timeSheetResponseList.length > 0 &&
                                <Select
                                    sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontSize: 16 }}
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    className="month-dropdown"
                                >
                                    {months.map((month, index) => (
                                        <MenuItem key={month} value={index}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            }

                        </>
                        :
                        <>
                            <Skeleton className="item-skeleton item-skeleton-small" width={100} />
                            <Skeleton className="item-skeleton item-skeleton-small" width={100} />
                        </>
                    }

                </Grid>

            </Grid>
        );
    }

    useEffect(() => {
        if (items && items.timeSheetResponseList.length > 0) {

            const updatedRows: TimesheetRecord[] = [];

            items.timeSheetResponseList.forEach((timeSheet) => {
                timeSheet.projects.forEach((project) => {
                    updatedRows.push({
                        id: timeSheet.timeSheet.timesheetId,
                        date: moment(timeSheet.timeSheet.date).format(DATE_FORMAT),
                        project: project.projectName,
                        hours: timeSheet.presentDayTotalHours + ' ' + HOURS,
                        manager_approver: project.managerName,
                        status: project.status,
                    });
                });
            });
            setRows(updatedRows);

        }
    }, [items?.timeSheetResponseList])

    useEffect(() => {
        // Filter rows based on the selected month
        const filtered = rows.filter((row) => moment(row.date, DATE_FORMAT).month() === selectedMonth);
        setFilteredRows(filtered);
    }, [rows, selectedMonth]);

    const handleEditClick = (id: GridRowId) => () => {

    };

    // const handleDeleteClick = (id: GridRowId) => () => {
    // };

    const columns: GridColDef[] = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
        },
        {
            field: 'project',
            headerName: 'Project',
            editable: true,
            flex: 1
        },
        {
            field: 'hours',
            headerName: 'Hours',
            editable: true,
            flex: 1
        },
        {
            field: 'manager_approver',
            headerName: 'Manager/Approver',
            editable: true,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => {

                let statusClass = '';

                switch (params.row.status) {
                    case 'Approved':
                        statusClass = 'pill-success';
                        break;
                    case 'Expired':
                    case 'Rejected':
                        statusClass = 'pill-error';
                        break;
                    case 'Pending':
                        statusClass = 'pill-warning';
                        break;
                    default:
                        break;
                }

                return (
                    <Typography className={clsx('status-pills', statusClass)}>
                        {toCapitalize(params.row.status)}
                    </Typography>
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            getActions: ({ id }) => {

                return [
                    <GridActionsCellItem
                        icon={<HiOutlinePencil size='22px' />}
                        label="Edit"
                        sx={{
                            color: 'text.primary',
                        }}
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (

        <Grid className="table-box mt-5">
            {!loaded &&
                <>
                    {EditToolbar(false)}
                    < Grid className="p-5">
                        <Skeleton className="item-skeleton" />
                    </Grid>
                </>
            }
            {filteredRows.length > 0 &&
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    components={{
                        Toolbar: () => (
                            EditToolbar(true, selectedMonth, handleMonthChange)
                        ),
                    }}
                    disableRowSelectionOnClick
                />
            }
            {filteredRows.length === 0 && loaded &&
                <>
                    {EditToolbar(true, selectedMonth, handleMonthChange)}
                    <Grid className="p-20">
                        <EmptyState title={NO_DATA} subTitle={`There are no ${ATTENDANCE_HISTORY} available!`} iconName='HiOutlineRocketLaunch' small={true} />
                    </Grid>
                </>
            }
        </Grid>
    );
}

export default AttendanceTable;