import { DateSelectArg } from "@fullcalendar/core/index.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import 'moment-timezone';
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, boolean } from "yup";
import { useBanner } from "../../../../controls/Banner";
import MyTextField from "../../../../controls/FormControls/MyTextField";
import PrimaryButton from "../../../../controls/FormControls/PrimaryButton";
import { useUser } from "../../../../util/auth/UserInfoProvider";
import { isWeekend } from "../../../../util/commonUtility";
import { DATE_FORMAT, SUBMIT } from "../../../../util/string";
import { LeaveRecord, NewLeave } from "../../Calendar.model";
import { useLeave } from "../../Calendar.util";

const schema = object().shape({
    leave_type: string().required(),
    reason: string().required(),
    isHalfDay: boolean().required(),
});

const initialValue = { from_date: "", to_date: "", reason: '', leave_type: '', employee_id: '', isHalfDay: false };

type LeaveProps = {
    dateSelect?: DateSelectArg;
    leaveData?: LeaveRecord;
    onClose: () => void;
}

const ApplyLeave = ({ dateSelect, leaveData, onClose }: LeaveProps) => {
    let date = dateSelect?.start.valueOf();
    const [fromDate, setFromDate] = useState<any>(date ? moment(date) : null);
    const [toDate, setToDate] = useState<any>(date ? moment(date) : null);
    const [leaveTypes, setLeaveTypes] = useState<any>([{ value: 'CASUAL_LEAVE', label: 'Casual Leave' }, { value: 'SICK_LEAVE', label: 'Sick Leave' }]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const banner = useBanner();
    const { userInfo } = useUser();

    const methods = useForm<any>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });

    const applyLeaveMutationFn = useLeave();

    const applyLeaveMutation = useMutation(applyLeaveMutationFn, {
        onSuccess: async (res: any) => {
            if (res.status === 200) {
                banner.handleApiResponse(res, undefined, 'Leave Applied Successfully');
                methods.reset();
                setFromDate(null);
                setToDate(null);
                onClose();
                queryClient.invalidateQueries(['Leaves', 'AllLeaves', userInfo.employeeId]);
                setIsLoading(false);
            } else {
                banner.handleApiResponse(res, undefined, res.message);
                setIsLoading(false);
            }
            queryClient.setQueryData<NewLeave>(['Leaves', 'ApplyLeave', userInfo.employeeId], old => {
                const copy = { ...old! };
                return copy;
            });
        },
        useErrorBoundary: (error: any) => error.response?.status >= 201,
        onError: (err: any) => {
            banner.handleApiResponse(err);
            setIsLoading(false);
        }
    });

    const onSubmit: SubmitHandler<NewLeave> = async (data: NewLeave) => {
        setIsLoading(true);
        methods.setValue('from_date', moment(fromDate).format('YYYY-MM-DDTHH:mm:ss'));
        methods.setValue('to_date', moment(toDate).format('YYYY-MM-DDTHH:mm:ss'));
        methods.setValue('employee_id', userInfo.employeeId);
        try {
            await applyLeaveMutation.mutateAsync(data);

        } catch (error: any) {
            banner.handleApiResponse(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (leaveData) {
            setFromDate(moment(leaveData.fromDate, DATE_FORMAT));
            setToDate(moment(leaveData.toDate, DATE_FORMAT));
            methods.setValue('leave_type', leaveData.leaveType);
            methods.setValue('reason', leaveData.reason);
            methods.setValue('isHalfDay', leaveData.isHalfDay);
            setIsEditing(methods.getValues('reason') ? true : false);
        }

    }, [leaveData])

    return (
        <FormProvider {...methods}>
            <Box component="form" sx={{ pt: 3 }} onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container className="justify-between items-center" spacing={3}>
                    <Grid item sm={12} md={2.25}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="From Date"
                                value={fromDate}
                                format={DATE_FORMAT}
                                onChange={(val) => {
                                    setFromDate(val);
                                }}
                                className="small"
                                shouldDisableDate={isWeekend}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item sm={12} md={2.25}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="To Date"
                                className="small"
                                value={toDate}
                                format={DATE_FORMAT}
                                shouldDisableDate={isWeekend}
                                onChange={(val) => {
                                    setToDate(val);
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item sm={12} md={2.25}>
                        <MyTextField label="Leave Type" name="leave_type" helperText={false} items={leaveTypes} />
                    </Grid>
                    <Grid item sm={12} md={3.75}>
                        <MyTextField label="Please brief the reason" name="reason" helperText={false} shrink={isEditing} />
                    </Grid>
                    <Grid item sm={12} md={3.75}>
                        <RadioGroup
                            row
                            aria-label="isHalfDay"
                            name="isHalfDay"
                            value={methods.watch('isHalfDay')}
                            onChange={(e) => methods.setValue('isHalfDay', e.target.value === 'true')}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Half Day" />
                            <FormControlLabel value={false} control={<Radio />} label="Full Day" />
                        </RadioGroup>
                    </Grid>
                    <Grid item sm={12} md={1.5}>
                        <PrimaryButton label={SUBMIT} variant='outlined' size='large' loading={isLoading} onClick={banner.dismiss} />
                    </Grid>
                </Grid>
            </Box>
        </FormProvider>
    );
}

export default ApplyLeave;