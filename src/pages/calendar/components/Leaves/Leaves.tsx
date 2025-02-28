import { Card, Grid, Typography } from "@mui/material";
import "moment-timezone";
import { useState } from "react";
import { APPLY_LEAVE, APPLY_WFH } from "../../../../util/string";
import { LeaveRecord } from "../../Calendar.model";
import { EmployeeLeavesProps } from "../CalendarDashboard";
import ApplyLeave from "./ApplyLeave";
import LeaveTable from "./LeaveTable";

const Leaves = ({ items, loaded, refreshing, tableData, tableLoaded, isWFH }: EmployeeLeavesProps) => {
    const [leaveData, setLeaveData] = useState<LeaveRecord>();
    const handleLeaveData = (rowData: LeaveRecord) => {
        setLeaveData(rowData);
    };

    return (
        <>
            <Grid container>
                <Card className="p-8 w-full">
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{isWFH ? APPLY_WFH : APPLY_LEAVE }</Typography>
                    <ApplyLeave onClose={() => (true)} leaveData={leaveData} />
                </Card>
            </Grid>
            <Grid container>
                <LeaveTable
                    items={items}
                    loaded={loaded}
                    refreshing={refreshing}
                    onEdit={handleLeaveData}
                    tableData={tableData}
                    tableLoaded={tableLoaded}
                    isWFH={isWFH}
                />
            </Grid>
        </>
    );
}

export default Leaves;
