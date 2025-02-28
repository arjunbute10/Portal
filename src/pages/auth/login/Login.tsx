import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import Banner, { useBanner, withBannerSupport } from '../../../controls/Banner';
import MyTextField from '../../../controls/FormControls/MyTextField';
import PrimaryButton from '../../../controls/FormControls/PrimaryButton';
import AuthHeader from '../../../layout/AuthHeader';
import { useUser } from "../../../util/auth/UserInfoProvider";
import { withNoAuth } from "../../../util/auth/useAuthentication";
import LocalStorageUtil from '../../../util/useLocalStorage';
import { UserInfo, UserLogin } from './Login.model';
import { useLogin } from './Login.util';
import { EMAIL_ADDRESS, EMAIL_INVALID, EMAIL_REQUIRED, FORGET_PASSWORD, LOGIN, LOGIN_MESSAGE, LOGIN_SUCESS, LOGIN_SUNDEUS, PASSWORD, PASSWORD_REQUIRED } from "../../../util/string";

const schema = object().shape({
    userName: string()
        .required(EMAIL_REQUIRED)
        .email(EMAIL_INVALID),
    password: string()
        .required(PASSWORD_REQUIRED)
});

const initialValue: UserLogin = { userName: "", password: '' };

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const { updateUser } = useUser();

    const queryClient = useQueryClient();
    const banner = useBanner();

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const methods = useForm<any>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });

    const userLoginMutationFn = useLogin();

    const userLoginMutation = useMutation(userLoginMutationFn, {
        onSuccess: async (res: any) => {
            if (res.status === 200) {
                banner.handleApiResponse(res, undefined, LOGIN_SUCESS);
                methods.reset();
                LocalStorageUtil.setItem('access_token', res.loginDetails.token, true);
                delete res.loginDetails.token;
                const userInfo: UserInfo = res.loginDetails;
                LocalStorageUtil.setItem('userInfo', userInfo);
                updateUser(userInfo);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                banner.handleApiResponse(res, undefined, res.message);
                setIsLoading(false);
            }
            queryClient.setQueryData<UserLogin>(['Auth', 'Login', 'UserInfo'], old => {
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

    const onSubmit: SubmitHandler<UserLogin> = async (data: UserLogin) => {
        setIsLoading(true);
        try {
            await userLoginMutation.mutateAsync(data);
        } catch (error: any) {
            banner.handleApiResponse(error);
            setIsLoading(false);
        }
    }

    return (
        <>
            <AuthHeader />
            <Container maxWidth='lg' className='flex justify-center items-center mt-[3rem]'>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <img src="/assets/images/bg-login.png" alt="Login"/>
                    </Grid>
                    <Grid item xs={12} md={6} className='justify-center flex space-y-2' sx={{ flexDirection: 'column', marginTop: '-20px' }}>
                        <Banner />
                        <FormProvider {...methods}>
                            <Box component="form" sx={{ px: 4 }} onSubmit={methods.handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h2" sx={{ mb: 2 }}>{LOGIN_SUNDEUS}</Typography>
                                        <Typography variant="body1" sx={{ mb: 2 }}>{LOGIN_MESSAGE}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField label={EMAIL_ADDRESS} name="userName" size='medium' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField
                                            label={PASSWORD}
                                            type={showPassword ? 'text' : 'password'}
                                            size='medium'
                                            name="password"
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
                                    </Grid>
                                    <Grid item xs={12} className='justify-end flex'>
                                    <Typography
                                            variant="h4"
                                            color="primary"
                                            sx={{cursor: 'pointer'}}
                                            onClick={() => navigate('/reset-password')}
                                        >{FORGET_PASSWORD}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PrimaryButton label={LOGIN} variant='contained' size='large' style={{ fontSize: 18 }} loading={isLoading} onClick={banner.dismiss} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormProvider>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default withNoAuth(withBannerSupport(Login));