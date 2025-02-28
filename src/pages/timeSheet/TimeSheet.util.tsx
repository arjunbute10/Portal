import { Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useBanner } from "../../controls/Banner";
import { useUser } from "../../util/auth/UserInfoProvider";
import { Config, Method, useApi } from "../../util/fetch/ApiProvider";
import { TimeSheetResponseRecord } from "./TimeSheet.model";

export const _getTimeSheetResponseList = (empId: string): Config<TimeSheetResponseRecord> => ({
    endpoint: `/getTimeSheetByEmpId/${empId}`,
    method: Method.GET
});

export const useTimeSheetResponseList = () => {
    const { callApi } = useApi();
    const { userInfo } = useUser();
    const banner = useBanner();
    const queryKey = ['TimeSheet', 'TimeSheetResponseList', userInfo.employeeId];

    return {
        query: useQuery<TimeSheetResponseRecord>(
            queryKey,
            () => {
                const config = _getTimeSheetResponseList(userInfo.employeeId);
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


