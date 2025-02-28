import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { object, string } from 'yup';
import Banner, { useBanner, withBannerSupport } from "../../../controls/Banner";
import MyTextField from '../../../controls/FormControls/MyTextField';
import PrimaryButton from '../../../controls/FormControls/PrimaryButton';
import { CONFIRM_PASSWORD, CONFIRM_PASSWORD_REQUIRED, NEW_PASSWORD_REQUIRED, PASSWORD, RESEND_CODE, RESEND_MESSAGE, RESET_MESSAGE, RESET_SUCESS, SUBMIT } from "../../../util/string";
import { CreateNewPassword, ForgotPasswordData } from "./ForgotPassword.model";
import { useCreateNewPassword, useForgotPassword } from "./ForgotPassword.util";

type ChangePasswordProps = {
    emailAddress: string;
    onClose: () => void;
}


const schema = object().shape({
    newPassword: string()
        .required(NEW_PASSWORD_REQUIRED),
    confirmPassword: string()
        .required(CONFIRM_PASSWORD_REQUIRED)
});

const initialValue: CreateNewPassword = { otp: '', newPassword: '', confirmPassword: '' };

const ChangePassword = ({ emailAddress, onClose }: ChangePasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [isResendOTP, setIsResendOTP] = useState(false);
    const [initialCount, setInitialCount] = useState<number>();
    const [otp, setOTP] = useState<string>('');
    const [forgetData, setForgetData] = useState<ForgotPasswordData>({ userName: emailAddress });
    const ResendOTPTimer = 30;

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const banner = useBanner();

    const methods = useForm<any>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const forgotPasswordMutationFn = useForgotPassword();

    const forgotPasswordMutation = useMutation(forgotPasswordMutationFn, {
        onSuccess: async (res: any) => {
            if (res.status === 200) {
                banner.handleApiResponse(res, undefined, res.message);
            } else {
                banner.handleApiResponse(res, undefined, res.message);
            }
            queryClient.setQueryData<ForgotPasswordData>(['Auth', 'Resend Password', emailAddress], old => {
                const copy = { ...old! };
                return copy;
            });
        },
        useErrorBoundary: (error: any) => error.response?.status >= 201,
        onError: (err: any) => {
            banner.handleApiResponse(err);
        }
    });

    const changePasswordMutationFn = useCreateNewPassword();

    const changePasswordMutation = useMutation(changePasswordMutationFn, {
        onSuccess: async (res: any) => {
            if (res.status === 201) {
                setOTP('');
                methods.reset(initialValue);
                banner.handleApiResponse(res, undefined, RESET_SUCESS);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                banner.handleApiResponse(res, undefined, res.message);
                setIsLoading(false);
            }
            queryClient.setQueryData<CreateNewPassword>(['Auth', 'Change Password', emailAddress], old => {
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

    const onSubmit: SubmitHandler<CreateNewPassword> = async (data: CreateNewPassword) => {
        setIsLoading(true);
        try {
            await changePasswordMutation.mutateAsync(data);
            setIsLoading(false);
            _onClose();
        } catch (error: any) {
            banner.handleApiResponse(error);
            setIsLoading(false);
        }
    };



    const sendOTP = async () => {
        setOTP('');
        try {
            setTimerAndVariables();
            await forgotPasswordMutation.mutateAsync(forgetData);
        } catch (error) {
            console.error(error);
        }
    };

    const setTimerAndVariables = () => {
        // Logic to set the timer and other variables
        setInitialCount(ResendOTPTimer);
        let count = ResendOTPTimer;
        setIsResendOTP(true);
        const nIntervId = setInterval(() => {
            count = count - 1;
            setInitialCount(count);
        }, 1000);
        setTimeout(() => {
            setIsResendOTP(false);
            clearInterval(nIntervId);
        }, 20000);
    };

    const handleChange = (inputOTP: any) => {
        setOTP(inputOTP);
        methods.setValue('otp', inputOTP, { shouldDirty: true });
    };

    const _onClose = () => {

    };

    return (
        <Grid container>
            <Banner />
            <FormProvider {...methods}>
                <Grid item>
                    <Typography variant="body1" sx={{ fontSize: '18px', mb: 2 }} color="text.primary">
                        {RESET_MESSAGE} <b>{emailAddress}</b>:
                    </Typography>
                </Grid>
                <Grid item>
                    <Box component="form" className="flex justify-center" onSubmit={methods.handleSubmit(onSubmit)}>
                        <Grid item xs={12} md={8} className="otp-wrapper space-y-5">
                            <OtpInput
                                value={otp}
                                onChange={handleChange}
                                numInputs={4}
                                renderSeparator={<span>&nbsp;</span>}
                                shouldAutoFocus
                                inputType='password'
                                renderInput={(props) => <input {...props} className="otp-input" />}
                            />

                            <MyTextField
                                label={PASSWORD}
                                type={showPassword ? 'text' : 'password'}
                                name="newPassword"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <MyTextField
                                label={CONFIRM_PASSWORD}
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <PrimaryButton label={SUBMIT} size='medium' style={{ fontSize: 18 }} loading={isLoading} onClick={banner.dismiss} />
                        </Grid>
                    </Box>
                </Grid>
            </FormProvider>

            <Grid item sx={{ mt: 4 }} className="flex justify-center w-full">
                <Typography variant="caption">
                    {RESEND_MESSAGE}
                    <u className={clsx("cursor-pointer", { "disabled": isResendOTP })} onClick={sendOTP}><strong>{RESEND_CODE} {isResendOTP && "(" + initialCount + ")"}</strong></u>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default withBannerSupport(ChangePassword);