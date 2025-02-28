import { Grid, Skeleton } from "@mui/material";
import {
    useQuery
} from '@tanstack/react-query';
import React from "react";
import { useBanner } from "../../controls/Banner";
import { Config, Method, useApi } from "../../util/fetch/ApiProvider";
import { AllEmployees, IfscRecord } from "./Employee.model";

export const _getAllEmployees = (limit: number = 100, offset: number = 0): Config<AllEmployees> => ({
    endpoint: `/getAllEmployees/${offset}/${limit}`,
    method: Method.GET
});

export const _getBankRecord = (ifscCode: string): Config<IfscRecord> => ({
    endpoint: `https://ifsc.razorpay.com/${ifscCode}`,
    method: Method.GET
});

export const useAllEmployees = () => {
    const { callApi } = useApi();
    const banner = useBanner();
    const queryKey = ['Employee', 'AllEmployees'];

    return {
        query: useQuery<AllEmployees>(
            queryKey,
            () => {
                const config = _getAllEmployees();
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

export const useRazorpayIFSC = (ifscCode: string) => {
    const { externalCallApi } = useApi();
    const banner = useBanner();
    const queryKey = ['Razorpay', 'IFSC', ifscCode];

    return {
        query: useQuery<IfscRecord>(
            queryKey,
            () => {
                const config = _getBankRecord(ifscCode);
                return externalCallApi(config);
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