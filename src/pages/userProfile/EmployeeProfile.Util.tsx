import { Grid, Skeleton } from "@mui/material";
import React from "react";
import { Config, Method, useApi } from "../../util/fetch/ApiProvider";
import { EmployeeRecord } from "./EmployeeProfile.model";
import { useBanner } from "../../controls/Banner";
import { useQuery } from '@tanstack/react-query';
import { useUser } from "../../util/auth/UserInfoProvider";

export const _getEmployeeProfile = (userId: string, empId: string): Config<EmployeeRecord> => ({
    endpoint: `/getEmployee/${userId}/${empId}`,
    method: Method.GET
});

export const useEmployeeProfile = (empId: string) => {
    const { callApi } = useApi();
    const banner = useBanner();
    const { userInfo } = useUser();

    const queryKey = ['Employee', 'EmployeeData', empId];

    return {
        query: useQuery<EmployeeRecord>(
            queryKey,
            () => {
                const config = _getEmployeeProfile(userInfo.employeeId, empId);
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
