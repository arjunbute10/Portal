import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, Typography } from '@mui/material';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { object, string } from 'yup';
import Banner, { useBanner, withBannerSupport } from "../../../controls/Banner";
import { DialogBox } from "../../../controls/DialogBox";
import MyTextField from '../../../controls/FormControls/MyTextField';
import PrimaryButton from '../../../controls/FormControls/PrimaryButton';
import AuthHeader from '../../../layout/AuthHeader';
import { withNoAuth } from "../../../util/auth/useAuthentication";
import { BACK_LOGIN, EMAIL_ADDRESS, EMAIL_INVALID, EMAIL_REQUIRED, FORGET_MESSAGE, FORGET_PASSWORD, RESET_PASSWORD, SUBMIT } from "../../../util/string";
import ChangePassword from "./ChangePassword";
import { ForgotPasswordData } from "./ForgotPassword.model";
import { useForgotPassword } from "./ForgotPassword.util";


const schema = object().shape({
    userName: string()
        .required(EMAIL_REQUIRED)
        .email(EMAIL_INVALID)
});

const initialValue: ForgotPasswordData = { userName: "" };

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);

    const queryClient = useQueryClient();
    const banner = useBanner();
    const navigate = useNavigate();
    const methods = useForm<any>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });

    const forgotPasswordMutationFn = useForgotPassword();

    const forgotPasswordMutation = useMutation(forgotPasswordMutationFn, {
        onSuccess: async (res: any) => {
            if (res.status === 200) {
                banner.handleApiResponse(res, undefined, res.message);
                setOpen(true);
                // methods.reset();
            } else {
                banner.handleApiResponse(res, undefined, res.message);
                setIsLoading(false);
            }
            queryClient.setQueryData<ForgotPasswordData>(['Auth', 'Forget Password', methods.getValues('userName')], old => {
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

    const onSubmit: SubmitHandler<ForgotPasswordData> = async (data: ForgotPasswordData) => {
        setIsLoading(true);
        try {
            await forgotPasswordMutation.mutateAsync(data);
            setIsLoading(false);
        } catch (error: any) {
            banner.handleApiResponse(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <AuthHeader />
            <Container maxWidth='lg' className='flex justify-center items-center mt-[6rem]'>
                <Grid container>
                    <Grid item xs={12} md={6} className='justify-center flex space-y-3' sx={{ flexDirection: 'column' }}>
                        <Banner />
                        <FormProvider {...methods}>
                            <Box component="form" sx={{ px: 4 }} onSubmit={methods.handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h2" sx={{ mb: 2 }}>{FORGET_PASSWORD}</Typography>
                                        <Typography variant="body1" sx={{ mb: 2 }}>{FORGET_MESSAGE}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField label={EMAIL_ADDRESS} name="userName" size='medium' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PrimaryButton label={SUBMIT} size='large' style={{ fontSize: 18 }} loading={isLoading} onClick={banner.dismiss}/>
                                    </Grid>
                                    <Grid item xs={12} className='justify-center flex'>
                                        <Typography
                                            variant="h4"
                                            color="primary"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => navigate('/login')}
                                        >{BACK_LOGIN}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src="/assets/images/bg-forgot.png" alt="Forget Password" />
                    </Grid>
                </Grid>
            </Container>


            <DialogBox
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                title={RESET_PASSWORD}
                maxWidth="sm"
                content={<ChangePassword onClose={() => setOpen(false)} emailAddress={methods.getValues('userName')} />}
            />

            {/* <Dialog open={isOpen} onClose={_onClose} className="w-">
                    <DialogTitle>
                        <Typography fontSize={'20px'} variant="h6">Reset Password</Typography>
                        <IconButton
                            aria-label="close"
                            onClick={_onClose}
                            sx={{
                                position: 'absolute',
                                right: 10,
                                top: 12,
                            }}
                        >
                            <HiXMark />
                        </IconButton>

                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container sx={{ px: 3, py: 2 }}>
                            <FormProvider {...resetMethods}>
                                <Typography variant="body1" sx={{ fontSize: '19px', mb: 2 }} color="text.primary">
                                    Please enter the 4 digit code sent to you on <b>{methods.getValues('userName')}</b>:
                                </Typography>
                                <Box component="form" className="flex justify-center" onSubmit={resetMethods.handleSubmit(onSubmit)}>

                                    <Grid item xs={9} className="otp-wrapper space-y-5">
                                        <OtpInput
                                            value={otp}
                                            onChange={handleChange}
                                            numInputs={4}
                                            renderSeparator={<span>&nbsp;</span>}
                                            shouldAutoFocus
                                            // inputType='password'
                                            renderInput={(props) => <input {...props} disabled={isOTPSent} className="otp-input" />}
                                        />
                                        <MyTextField label="New Password" name="newPassword" />
                                        <MyTextField label="Confirm Password" name="confirmPassword" />
                                        <PrimaryButton label='Submit' size='medium' style={{ fontSize: 18 }} loading={isLoading} onClick={banner.dismiss} />
                                    </Grid>
                                </Box>
                            </FormProvider>
                        </Grid>
                    </DialogContent>

                </Dialog> */}
        </>
    );
}

export default withNoAuth(withBannerSupport(ForgotPassword));