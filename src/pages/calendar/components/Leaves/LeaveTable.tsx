import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useBanner } from "../../../../controls/Banner";
import { DialogBox } from "../../../../controls/DialogBox";
import EmptyState from "../../../../controls/EmptyState";
import { useUser } from "../../../../util/auth/UserInfoProvider";
import { getLeaveTypeName, toCapitalize } from "../../../../util/commonUtility";
import { APPROVED, DATE_FORMAT, DELETE, DELETE_MESSAGE, EXPIRED, LEAVES_BALANCE, LEAVES_TAKEN, LEAVE_HISTORY, NO, NO_DATA, PENDING, REJECTED, TOTAL_LEAVES, TOTAL_WFH, WFH_HISTORY, WFH_TAKEN, YES } from "../../../../util/string";
import { useSnackbar } from "../../../../util/useSnackbar";
import { HTTPResponse, LeaveDashbaord, LeaveRecord } from "../../Calendar.model";
import { useDeleteLeave } from "../../Calendar.util";

const initialRows: LeaveRecord[] = [];


export interface LeaveTableProps {
    loaded: boolean;
    items: LeaveDashbaord | null;
    tableData: LeaveRecord[];
    tableLoaded: boolean;
    refreshing: boolean;
    isWFH?: boolean
    onEdit: (rowData: LeaveRecord) => void;
}


const LeaveTable = ({ items, loaded, tableData, tableLoaded, refreshing, isWFH, onEdit }: LeaveTableProps) => {

    const [rows, setRows] = useState(initialRows);
    const [isOpen, setOpen] = useState(false);
    const [leaveId, setLeaveId] = useState<string | number>(0);

    const queryClient = useQueryClient();
    const banner = useBanner();
    const { showMessage } = useSnackbar();
    const { userInfo } = useUser()
    const deleteLeaveMutationFn = useDeleteLeave();

    const deleteLeaveMutation = useMutation(deleteLeaveMutationFn, {
        onSuccess: async (res: HTTPResponse) => {
            if (res.status === 200) {
                queryClient.invalidateQueries(['Leaves', 'AllLeaves', userInfo.employeeId]);
                setOpen(false);
                showMessage({
                    message: 'Leave deleted successfully',
                    severity: 'success',
                });
            } else {
                showMessage({
                    message: res.message,
                    severity: 'warning',
                });
            }
            queryClient.setQueryData<HTTPResponse>(['Leaves', 'Delete', leaveId], old => {
                const copy = { ...old! };
                return copy;
            });
        },
        useErrorBoundary: (error: any) => error.response?.status >= 201,
        onError: (err: any) => {
            banner.handleApiResponse(err);
        }
    });

    const EditToolbar = (disableSkeleton: boolean = true) => {
        return (
            <Grid container className='bg-tableHeader py-3 px-8 rounded-t-[12px] justify-between items-center'>
                <Grid item>
                    <Typography variant="h6">
                        {isWFH ? WFH_HISTORY : LEAVE_HISTORY}
                    </Typography>
                </Grid>
                <Grid item className="flex space-x-5">
                    {disableSkeleton && loaded ?
                        <>
                            {!isWFH ?
                                <>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{TOTAL_LEAVES}: {items?.leaveDetailCount.totalLeaves}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{LEAVES_TAKEN}: {items?.leaveDetailCount.leaveTaken}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{LEAVES_BALANCE}: {items?.leaveDetailCount.totalAvailable}</Typography></>
                                :
                                <>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{TOTAL_WFH}: {items?.wfhDetailCount.totalLeaves}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{WFH_TAKEN}: {items?.wfhDetailCount.leaveTaken}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{LEAVES_BALANCE}: {items?.wfhDetailCount.totalAvailable}</Typography>
                                </>
                            }

                        </> :
                        <>
                            <Skeleton className="item-skeleton item-skeleton-small" width={100} />
                            <Skeleton className="item-skeleton item-skeleton-small" width={100} />
                            <Skeleton className="item-skeleton item-skeleton-small" width={100} />
                        </>
                    }

                </Grid>

            </Grid>
        );
    }

    useEffect(() => {
        if (tableData.length > 0) {
            const updatedRows = tableData.map(item => {
                return {
                    ...item,
                    id: item.leaveId,
                    fromDate: moment(item.fromDate).format(DATE_FORMAT),
                    toDate: moment(item.toDate).format(DATE_FORMAT),
                    leaveType: getLeaveTypeName(item.leaveType),
                };
            });
            setRows(updatedRows);
        }
    }, [tableData]);


    const handleEdit = (id: GridRowId) => {
        const selectedRowData = rows.find(row => row.id === id); // Assuming 'rows' contains your data
        if (selectedRowData) {
            onEdit(selectedRowData);
        }
    };

    const handleDelete = async (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await deleteLeaveMutation.mutateAsync(leaveId);
        } catch (error: any) {
            banner.handleApiResponse(error);
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'fromDate',
            headerName: 'From Date',
            flex: 1

        },
        {
            field: 'toDate',
            headerName: 'To Date',
            flex: 1

        },
        {
            field: 'leaveType',
            headerName: 'Leave Type',
            flex: 1

        },
        {
            field: 'reason',
            headerName: 'Reason',
            flex: 1

        },
        {
            field: 'managerName',
            headerName: 'Manager/Approver',
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => {

                let statusClass = '';

                switch (params.row.status) {
                    case APPROVED:
                        statusClass = 'pill-success';
                        break;
                    case EXPIRED:
                    case REJECTED:
                        statusClass = 'pill-error';
                        break;
                    case PENDING:
                        statusClass = 'pill-warning';
                        break;
                    default:
                        break;
                }

                return (<Typography className={clsx('status-pills', statusClass)}>
                    {toCapitalize(params.row.status)}
                </Typography>);
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            cellClassName: 'actions',
            flex: 1,
            getActions: ({ id, row }) => {
                const isPending = row.status === 'PENDING';
                return [
                    <GridActionsCellItem
                        icon={<HiOutlinePencil size='22px' />}
                        label="Edit"
                        sx={{
                            color: 'text.primary',
                        }}
                        disabled={!isPending}
                        onClick={() => handleEdit(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<HiOutlineTrash size='22px' />}
                        label="Delete"
                        disabled={!isPending}
                        onClick={() => { setOpen(true), setLeaveId(id) }}
                        color="error"
                    />,
                ];
            },
        },
    ];

    return (
        <Grid className="table-box mt-5">
            {refreshing &&
                <>
                    {EditToolbar(false)}
                    < Grid className="p-5">
                        <Skeleton className="item-skeleton" />
                    </Grid>
                </>
            }
            {tableData.length > 0 &&
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: EditToolbar,
                    }}
                />
            }
            {tableData.length === 0 && tableLoaded &&
                <>
                    {EditToolbar(true)}
                    <Grid className="p-20">
                        <EmptyState title={NO_DATA} subTitle={`There are no ${isWFH ? WFH_HISTORY : LEAVE_HISTORY} available!`} iconName='HiOutlineRocketLaunch' small={true} />
                    </Grid>
                </>
            }
            <DialogBox
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                title={DELETE}
                content={DELETE_MESSAGE}
                actions={
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => setOpen(false)}
                            color="error"
                        >
                            {NO}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={(e: any) => {
                                handleDelete(e);
                            }}
                            color="error"
                        >
                            {YES}
                        </Button>
                    </>
                }
            />
        </Grid>
    );
}

export default LeaveTable;